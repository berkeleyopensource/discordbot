import EECSCommand from '../EECSCommand'
import { CommandoClient, CommandoMessage } from 'discord.js-commando'

export class ClassToRoleCommand extends EECSCommand {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'classtorole',
            group: 'util',
            memberName: 'classtorole',
            description: 'temporary command',
            hidden: true,
            adminOnly: true
        })
    }

    execute(message: CommandoMessage): Promise<null> {
        // TODO: y'all, i have no idea what the original code was supposed to do. i'll leave this to you guys :P
        return new Promise(() => {})
    }
}