import { TextChannel, User, MessageEmbed } from 'discord.js'
import { client } from './bot'
import { CronJob } from 'cron'

export async function scheduleBirthday(birthmonth: number, birthday: number, userid : string) {
    const job = new CronJob({
        cronTime: `0 0 0 ${birthday} ${birthmonth} *`,
        onTick: async () => {
            await client.users.fetch(userid).then(
                (user) => celebrateBirthday(user), 
                () => console.log(`Tried to celebrate UserID ${userid}'s birthday but failed to find them.`)
            )
        },
        timeZone: 'America/Los_Angeles'
    })
    job.start()
}

async function celebrateBirthday(user: User) {
    const embed = {
        title: 'Happy Birthday! 🎂' ,
        color: 0xff9900,
        description: `Please wish a happy birthday to <@!${user.id}>!`,
        thumbnail: {
            url: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`
        }
    }
    
    const OUTPUT_CHANNEL = client.channels.resolve(process.env.OUTPUT_CHANNEL_ID) as TextChannel
    return OUTPUT_CHANNEL.send({embed})
}