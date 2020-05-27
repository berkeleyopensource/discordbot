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

    async execute(message: CommandoMessage, args: { code: number }) {
        if (verifyCode(message.author, args.code)) {
            await this.client.guilds.resolve(process.env.GUILD_ID).member(message.author).roles.add(process.env.VERIFIED_ROLE_ID)

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