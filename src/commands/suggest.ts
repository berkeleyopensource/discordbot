import EECSCommand from '../EECSCommand'
import { CommandoClient, CommandoMessage } from 'discord.js-commando'
import { MessageEmbed, Message } from 'discord.js'
import { topics } from './collect'

export class SuggestCommand extends EECSCommand {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'suggest',
            group: 'util',
            memberName: 'suggest',
            description: 'suggests something for a topic',
            throttleTime: 3,
        })
    }

    async execute(message: CommandoMessage, args: string) {
        const words = args.split(/\s/)
        if (args) {
            let topicName = words[0]
            if (topics.has(topicName)) {
                let topic = topics.get(topicName)
                if (words.length > 1) {
                    let suggestion = args.substr(topicName.length).trim()
                    if (topic.has(suggestion)) {
                        let num = topic.get(suggestion)
                        topic.set(suggestion, num + 1)
                    } else {
                        topic.set(suggestion, 1)
                    }
                    return message.say(`> \`${suggestion}\` suggested to topic \`${topicName}\``)
                } else {
                    if (topic.size) {
                        let contents = this.topicSuggestions(topic)
                        return await message.say(
                            new MessageEmbed({
                                title: `\`${topicName}\``,
                                color: 0x003262,
                            }).addField('Suggestions:', contents)
                        )
                    } else {
                        return await message.say(`> Current no suggestions for topic \`${topicName}\``)
                    }
                }
            } else {
                return message.say(`> \`${topicName}\` topic not found.`)
            }
        } else {
            if (topics.size) {
                let contents = ''
                for (let key of topics.keys()) {
                    contents += `\`${key}\` \`(${topics.get(key).size} suggestions)\`\n`
                }
                return await message.say(
                    new MessageEmbed({
                        title: 'Currently open topics:',
                        description:
                            `Use \`${process.env.PREFIX}suggest [topic]\` to view individual suggestions\n` +
                            `Suggest with \`${process.env.PREFIX}suggest [topic] [suggestion]\``,
                        color: 0xfdb515,
                    }).addField('Topics:', contents)
                )
            } else {
                return message.say('> No topics open for suggestions.')
            }
        }
    }

    topicSuggestions(topic: Map<string, number>): string {
        let sorted = Array.from(topic.entries()).sort((a, b) => b[1] - a[1])
        let contents = ''
        for (let [name, number] of sorted) {
            contents += `\`${name}\` \`(${number} times)\`\n`
        }
        return contents
    }
}
