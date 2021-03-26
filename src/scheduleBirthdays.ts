import { TextChannel, User } from 'discord.js'
import { client } from './bot'
import { CronJob } from 'cron'

const birthdayJobs: { [userID: string]: CronJob } = {}

export async function scheduleBirthday(birthmonth: number, birthday: number, userID: string) {
    const job = new CronJob({
        cronTime: `0 0 0 ${birthday} ${birthmonth} *`,
        onTick: async () => {
            await client.users.fetch(userID).then(
                user => celebrateBirthday(user),
                () => console.log(`Tried to celebrate UserID ${userID}'s birthday but failed to find them.`)
            )
        },
        timeZone: 'America/Los_Angeles',
    })

    birthdayJobs[userID] = job

    job.start()
}

export async function unscheduleBirthday(userID: string) {
    if (userID in birthdayJobs) {
        birthdayJobs[userID].stop()
        delete birthdayJobs[userID]
    }
}

async function celebrateBirthday(user: User) {
    const embed = {
        title: 'Happy Birthday! 🎂',
        color: 0xfdb515,
        description: `Please wish a happy birthday to <@!${user.id}>!`,
        thumbnail: {
            url: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`,
        },
    }

    const OUTPUT_CHANNEL = client.channels.resolve(process.env.STDOUT_CHANNEL_ID) as TextChannel
    return OUTPUT_CHANNEL.send({ embed })
}
