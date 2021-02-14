import EECSCommand from '../EECSCommand'
import { CommandoClient, CommandoMessage } from 'discord.js-commando'
import { scheduleBirthday } from '../scheduleBirthdays'
import { birthdayDB } from '../sequelizeDB'
import { Message } from 'discord.js'
import * as moment from 'moment'

export class SetBirthdayCommand extends EECSCommand {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'setbday',
            group: 'fun',
            memberName: 'setbday',
            description: 'sets your birthday',
            throttleTime: 15,
        })
    }

    private readonly DATEFORMS : string[] = ['M D', 'M/D', 'M.D', 'M-D', 
                                            'MM DD', 'MM/DD', 'MM.DD', 'MM-DD',
                                            'MMM DD', 'MMM D', 'MMM Do',
                                            'MMMM DD', 'MMMM D', 'MMMM Do']

    async execute(message: CommandoMessage, args: string) {
        const birthday = moment(`2020-${args}`, this.DATEFORMS.map(form => `YYYY-${form}`), true); //2020 to account for leap year bdays

        if (birthday.isValid()) {

            await message.direct(`> Your Birthday was recorded as: \`${birthday.format("MMMM Do")}\``)
            const confirmMessage = (await message.direct('> Does this look good?')) as Message
            await confirmMessage.react('👍')
            await confirmMessage.react('👎')
            confirmMessage
                .awaitReactions(
                    (reaction, user) =>
                        user.id === message.author.id && (reaction.emoji.name === '👍' || reaction.emoji.name === '👎'),
                    { max: 1, time: 10000 }
                )
                .then(async collection => {
                    if (collection.first().emoji.name === '👍') {
                        await birthdayDB.upsert({
                            user_id: message.author.id,
                            birth_month: birthday.month(),
                            birth_day: birthday.date()
                        }, {
                            validate: true
                        })
                        confirmMessage.delete()
                        return scheduleBirthday(birthday.month(), birthday.date(), message.author.id).then(
                            () => (message.react('👍')),
                            (err) => {
                                console.log(err)
                                return message.direct('There was an issue scheduling your birthday. Try again later.')
                            }
                        )
                    } else {
                        confirmMessage.delete()
                        return message.say('> Birthday scheduling cancelled.')
                    }
                })
                .catch(() => {
                    confirmMessage.delete()
                    return message.say('> No response, birthday scheduling canceled.')
                })
            
        } else {
            return message.say('> Enter a Valid \`MM-DD\` Date.')
        }
    }
}
