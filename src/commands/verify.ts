import EECSCommand from '../EECSCommand'
import { CommandoClient, CommandoMessage } from 'discord.js-commando'
import { MessageEmbed } from 'discord.js'

export class VerifyCommand extends EECSCommand {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'verify',
            group: 'mod',
            memberName: 'verify',
            description: 'instructions for verification',
            dmOnly: true,
            unverifiedOnly: true,
        })
    }

    execute(message: CommandoMessage) {
        return message.say(
            new MessageEmbed({
                title: 'Verification Instructions',
                description:
                    'Please submit your Berkeley email for verification.\n' +
                    'If you have any issues with verification, please direct message a moderator.',
                color: 0xfdb515,
            }).addField('Instructions:', `Submit your email using\n\`${process.env.PREFIX}email ***@berkeley.edu\`\n\n`)
        )
    }
}
