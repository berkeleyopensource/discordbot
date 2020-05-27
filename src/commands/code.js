import EECSCommand from '../EECSCommand'
import { MessageEmbed } from 'discord.js'
import { verifyCode } from '../verification'

export class CodeCommand extends EECSCommand {
    constructor(client) {
        super(client, {
            name: 'code',
            group: 'mod',
            memberName: 'code',
            description: 'submits code for verification',
            args: [
                {
                    key: 'code',
                    prompt: '> Please enter a valid code',
                    type: 'integer'
                }
            ],
            hidden: true,
            dmOnly: true,
            unverifiedOnly: true
        })
    }

    execute(message, { code }) {
        if (verifyCode(message.author, code)) {
            return message.say(new MessageEmbed({
                title: 'Verification Successful',
                description: `User \`${message.author.tag}\` has been verified.`,
                color: 0xfdb515
            }))
        } else {
            return message.say('> Incorrect verification code')
        }
    }
}