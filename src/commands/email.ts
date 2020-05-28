import EECSCommand from '../EECSCommand'
import { sendCode } from '../verification'
import { MessageEmbed } from 'discord.js'
import { CommandoClient, CommandoMessage } from 'discord.js-commando'

export class EmailCommand extends EECSCommand {
    private readonly regex = /^[A-z0-9._%+-]+@berkeley\.edu$/

    constructor(client: CommandoClient) {
        super(client, {
            name: 'email',
            group: 'mod',
            memberName: 'email',
            description: 'submits email for verification',
            hidden: true,
            dmOnly: true,
            unverifiedOnly: true,
            throttleTime: 15,
        })
    }

    execute(message: CommandoMessage, args: string) {
        if (!this.regex.test(args)) return message.say('> Please enter a valid Berkeley email')

        let success = sendCode(message.author, args)
        if (success) {
            return message.say(
                new MessageEmbed({
                    title: `Email Received`,
                    description:
                        `Verification code successfully sent to \`${args}\`\n\n` +
                        'Once you receive your temporary verification code, please verify using\n' +
                        `\`${process.env.PREFIX}code [verification code]\``,
                    color: 0xfdb515,
                })
            )
        } else {
            return message.say(`> Error sending email to \`${args}\``)
        }
    }
}
