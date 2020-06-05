import EECSCommand from '../EECSCommand'
import { MessageEmbed } from 'discord.js'
import { verifyCode } from '../verification'
import { CommandoClient, CommandoMessage } from 'discord.js-commando'

export class CodeCommand extends EECSCommand {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'code',
            group: 'mod',
            memberName: 'code',
            description: 'submits code for verification',
            hidden: true,
            dmOnly: true,
            unverifiedOnly: true,
        })
    }

    async execute(message: CommandoMessage, args: string) {
        if (!args || isNaN(Number(args))) {
            return message.say('> Please enter a valid code')
        }
        if (verifyCode(message.author, Number(args))) {
            await this.client.guilds
                .resolve(process.env.GUILD_ID)
                .member(message.author)
                .roles.add(process.env.VERIFIED_ROLE_ID)

            return message.say(
                new MessageEmbed({
                    title: 'Verification Successful',
                    description:
                        `User \`${message.author.tag}\` has been verified.\n` +
                        'Please flair your status and pick the classes you want to see in `#roles`',
                    color: 0xfdb515,
                })
            )
        } else {
            return message.say('> Incorrect verification code')
        }
    }
}
