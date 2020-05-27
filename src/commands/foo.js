import EECSCommand from '../EECSCommand'

export class FooCommand extends EECSCommand {
    constructor(client) {
        super(client, {
            name: 'foo',
            group: 'misc',
            memberName: 'foo',
            description: 'foo test command',
            hidden: true,
            throttling: {
                usages: 1,
                duration: 5
            },
        })
    }

    async execute(message) {
        return message.reply('bar')
    }
}