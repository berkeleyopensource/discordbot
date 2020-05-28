import EECSCommand from '../EECSCommand'
import { MessageEmbed } from 'discord.js'
import { CommandoClient, CommandoMessage } from 'discord.js-commando'

export class ClassToRoleCommand extends EECSCommand {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'rolemessages',
            group: 'mod',
            memberName: 'rolemessages',
            description: 'one time use',
            hidden: true,
            adminOnly: true,
        })
    }

    async execute(message: CommandoMessage) {
        await message.say(new MessageEmbed({
            title: 'EECS Lower Division',
            color: 0xfdb515,
        }))
        await message.say(new MessageEmbed({
            title: 'CS Upper Division',
            color: 0x003262,
        }))
        return message.say(new MessageEmbed({
            title: 'EE Upper Division',
            color: 0xfdb515,
        }))
    }
}
