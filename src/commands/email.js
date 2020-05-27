import EECSCommand from '../EECSCommand'
import { sendCode } from '../verification'
import { MessageEmbed } from 'discord.js'

export class EmailCommand extends EECSCommand {
    private readonly regex = /^[A-z0-9._%+-]+@berkeley\.edu$/

    constructor(client) {
        super(client, {
            name: 'email',
            group: 'mod',
            memberName: 'email',
            description: 'submits email for verification',
            args: [
                {
                    key: 'email',
                    prompt: '> Please enter a valid Berkeley email',
                    type: 'string'
                }
            ],
            hidden: true,
            throttling: {
                usages: 1,
                duration: 15
            },
            dmOnly: true,
            unverifiedOnly: true
        })
    }

    execute(message, { email }) {
        if (!this.regex.test(email)) 
            return message.say('> Please enter a valid Berkeley email')

        let success = sendCode(message.author, email)
        if (success) {
            return message.say(new MessageEmbed({
                title: `Email Received`,
                description: `Verification code successfully sent to \`${email}\`\n\n` +
                    'Once you receive your temporary verification code, please verify using\n' +
                    `\`${process.env.PREFIX}code [verification code]\``
                color: 0xfdb515
            }))
        } else {
            return message.say(`> Error sending email to \`${email}\``)
        }
    }
}