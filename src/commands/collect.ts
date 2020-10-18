import EECSCommand from '../EECSCommand'
import { CommandoClient, CommandoMessage } from 'discord.js-commando'
import { Message, MessageEmbed } from 'discord.js'
export let topics: any = new Map()

export class CollectCommand extends EECSCommand {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'collect',
            group: 'mod',
            memberName: 'collect',
            description: 'mod command to collect suggestions for a poll',
            hidden: true,
            adminOnly: true,
        })
    }

    async execute(message: CommandoMessage, args: string) {
        const words = args.split(/\s/)
        if (args) {
            if (words.length != 1) {
                return message.say('> Topic must be one word!')
            }
            let topicName = words[0]
            if (topics.has(topicName)) {
                let topic = topics.get(topicName) as Map<string, number>
                const confirmMessage = (await message.direct(`> Stop collecting for \`${topicName}\`?`)) as Message
                await confirmMessage.react('👍')
                await confirmMessage.react('👎')
                confirmMessage
                    .awaitReactions(
                        (reaction, user) =>
                            user.id === message.author.id &&
                            (reaction.emoji.name === '👍' || reaction.emoji.name === '👎'),
                        { max: 1, time: 10000 }
                    )
                    .then(async collection => {
                        if (collection.first().emoji.name === '👍') {
                            if (!topic.size) {
                                await message.direct(`No suggestions for poll \`${topicName}\``)
                            } else {
                                let contents = ''
                                let pollCommand = `\`${process.env.PREFIX}poll ${topicName}`
                                let sorted = Array.from(topic.entries()).sort((a, b) => b[1] - a[1])
                                let i = 0
                                for (let [name, number] of sorted) {
                                    contents += `\`${name}\` \`(${number} times)\`\n`
                                    if (i < 10) {
                                        pollCommand += ` | ${name}`
                                        i += 1
                                    }
                                }
                                pollCommand += '`'
                                await message.direct(
                                    new MessageEmbed({
                                        title: `Collected suggestions for \`${topicName}\``,
                                        color: 0xfdb515,
                                    })
                                        .addField('Topics:', contents)
                                        .addField('Run a poll with the top ten:', pollCommand)
                                )
                            }
                            topics.delete(topicName)
                            await message.say(`> Stopped collection for \`${topicName}\``)
                            return confirmMessage.delete()
                        } else {
                            confirmMessage.delete()
                            return message.say(`> Continuing collection for \`${topicName}\``)
                        }
                    })
                    .catch(() => {
                        confirmMessage.delete()
                        return message.say(`> No response, continuing collection for \`${topicName}\``)
                    })
            } else {
                const confirmMessage = (await message.direct(`> Start collecting for \`${topicName}\`?`)) as Message
                await confirmMessage.react('👍')
                await confirmMessage.react('👎')
                confirmMessage
                    .awaitReactions(
                        (reaction, user) =>
                            user.id === message.author.id &&
                            (reaction.emoji.name === '👍' || reaction.emoji.name === '👎'),
                        { max: 1, time: 10000 }
                    )
                    .then(async collection => {
                        if (collection.first().emoji.name === '👍') {
                            topics.set(topicName, new Map())
                            await message.say(`> Starting collection for new topic \`${topicName}\``)
                            confirmMessage.delete()
                        } else {
                            confirmMessage.delete()
                            return message.say(`> \`${topicName}\` topic creation cancelled.`)
                        }
                    })
                    .catch(() => {
                        confirmMessage.delete()
                        return message.say(`> No response, \`${topicName}\` topic creation cancelled.`)
                    })
            }
        } else {
            if (topics.size) {
                let contents = ''
                for (let key of topics.keys()) {
                    contents += `\`${key}\` \`(${topics.get(key).size} suggestions)\`\n`
                }
                return await message.say(
                    new MessageEmbed({
                        title: 'Currently collecting suggestions:',
                        description: `Run \`${process.env.PREFIX}suggest [topic]\` to see individual suggestions`,
                        color: 0xfdb515,
                    }).addField('Topics:', contents)
                )
            } else {
                return message.say('> Currently collecting suggestions for no topics.')
            }
        }
    }
}
