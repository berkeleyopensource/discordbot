import EECSCommand from '../EECSCommand'
import { CommandoClient, CommandoMessage } from 'discord.js-commando'
import { scheduleBirthday } from '../scheduleBirthdays'
import { seq, birthdayDB } from '../sequelizeDB'
import * as moment from 'moment'
import * as sequelize from 'sequelize'

export class SetBirthdayCommand extends EECSCommand {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'setbday',
            group: 'fun',
            memberName: 'setbday',
            description: 'sets your birthday',
            adminOnly: true
        })
    }

    private readonly DATEFORMS : string[] = ['M D', 'M/D', 'M.D', 'M-D', 
                                            'MM DD', 'MM/DD', 'MM.DD', 'MM-DD',
                                            'MMM DD', 'MMM D', 'MMM Do',
                                            'MMMM DD', 'MMMM D', 'MMMM Do']

    async execute(message: CommandoMessage, args: string) {
        const birthday = moment(`2020-${args}`, this.DATEFORMS.map(form => `YYYY-${form}`), true); //2020 to account for leap year bdays

        if (birthday.isValid()) {
            return scheduleBirthday(birthday.month(), birthday.date(), message.author.id).then(
                () => message.say(`Your birthday has been recorded as ${birthday.format("MMMM Do")}!`),
                (err) => {
                    console.log(err)
                    return message.say('There was an issue scheduling your birthday. Try again later.')
                }
            )
        } else {
            return message.say('Enter a Valid MM-DD Date.')
        }
    }
}
