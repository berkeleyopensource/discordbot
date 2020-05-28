import EECSCommand from '../EECSCommand'
import { CommandoClient, CommandoMessage } from 'discord.js-commando'

export class FooCommand extends EECSCommand {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'foo',
            group: 'misc',
            memberName: 'foo',
            description: 'foo test command',
            hidden: true,
            throttleTime: 5,
        })
    }

    async execute(message: CommandoMessage) {
        return message.reply('bar')
    }
}
