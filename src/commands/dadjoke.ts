import EECSCommand from '../EECSCommand'
import { CommandoClient, CommandoMessage } from 'discord.js-commando'
import fetch from 'node-fetch'

export class DadJokeCommand extends EECSCommand {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'dadjoke',
            group: 'fun',
            memberName: 'dadjoke',
            description: 'gets a random dadjoke',
        })
    }

    async execute(message: CommandoMessage) {
        try {
            const j = await fetch('https://icanhazdadjoke.com/', {
                headers: { Accept: 'text/plain' },
            })
            return message.say(await j.text())
        } catch (error) {
            console.log(error)
            return message.say('> Error querying dad joke :(')
        }
    }
}
