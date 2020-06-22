import EECSCommand from '../EECSCommand'
import { CommandoClient, CommandoMessage } from 'discord.js-commando'
import { MessageEmbed } from 'discord.js'

export class RoleMessagesCommand extends EECSCommand {
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
        await message.say(
            new MessageEmbed({
                title: 'Status Flairs',
                description:
                    '🚀: Prefrosh\n\n' +
                    '🛸: Not Berkeley\n\n' +
                    '✏️: Undergraduate\n\n' +
                    '💡: Graduate Student\n\n' +
                    '🎓: Alumni',
                color: 0xfdb515,
            })
        )
        await message.say(
            new MessageEmbed({
                title: 'View All Channels',
                description: '💻: Lower Division\n\n' + '🖥️: Upper Division',
                color: 0x003262,
            })
        )
        await message.say(
            new MessageEmbed({
                title: 'EECS Lower Division',
                color: 0xfdb515,
            })
        )
        await message.say(
            new MessageEmbed({
                title: 'CS Upper Division',
                color: 0x003262,
            })
        )
        return message.say(
            new MessageEmbed({
                title: 'EE Upper Division',
                color: 0xfdb515,
            })
        )
    }
}
