import EECSCommand from '../EECSCommand'

export class ClassToRoleCommand extends EECSCommand {
    constructor(client) {
        super(client, {
            name: 'classtorole',
            group: 'util',
            memberName: 'classtorole',
            description: 'temporary command',
            hidden: true,
            adminOnly: true
        })
    }

    execute(message) {
        // TODO: y'all, i have no idea what the original code was supposed to do. i'll leave this to you guys :P
    }
}