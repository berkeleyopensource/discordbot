import EECSCommand from '../EECSCommand'

export class DadJokeCommand extends EECSCommand {
    constructor(client) {
        super(client, {
            name: 'dadjoke',
            group: 'fun',
            memberName: 'dadjoke',
            description: 'gets a random dadjoke'
        })
    }

    async execute(message) {
        try {
            const j = await fetch('https://icanhazdadjoke.com/', {
                headers: { Accept: 'text/plain' },
            })
            return message.say(await j.text())
        } catch (error) {
            return message.say('> Error querying dad joke :(')
        }
    }
}