import EECSCommand from '../EECSCommand'
import { MessageEmbed, Message } from 'discord.js'
import { CommandoClient, CommandoMessage } from 'discord.js-commando'

export class PollCommand extends EECSCommand {
    private readonly emojis = ['0⃣', '1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣']
    constructor(client: CommandoClient) {
        super(client, {
            name: 'poll',
            group: 'util',
            memberName: 'poll',
            description: 'starts a poll',
            throttling: {
                usages: 1,
                duration: 10,
            },
            examples: ['poll {which is the superior cs?} {EECS} {LSCS} {cogsci} {cool socks}'],
        })
    }

    async execute(message: CommandoMessage, args: string) {
        // i did not bother to look through this code and clean it up other than small things but it seems to work
        const pollItems = args.split(/\s+(?={)/)
        if (pollItems.length < 2) {
            return message.direct(
                `> Items for \`${process.env.PREFIX}poll\` should be in curly brackets {}\n` +
                    `> Example: \`${process.env.PREFIX}poll {Beep?} {Beep} {Boop}\`\n` +
                    '> Please provide at least a question and one poll option'
            )
        }

        const question = pollItems.shift().slice(1, -1)
        if (pollItems.length > 10) {
            await message.say(`> Your input: \`${message.content}\``)
            return message.say('Poll value limit is 10')
        }
        let contents = ''
        for (let i = 0; i < pollItems.length; i++) {
            contents += `${this.emojis[i]} - \`${pollItems[i].slice(1, -1)}\`\n`
        }

        let embed = new MessageEmbed({
            title: `\`${question}\``,
            description: contents,
            color: 0xfdb515,
        }).setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))

        await message.direct(embed)
        await message.direct(`> Your input: \`${message.content}\``)
        const confirmMessage = (await message.direct('> Does this look good?')) as Message
        await confirmMessage.react('👍')
        await confirmMessage.react('👎')
        confirmMessage
            .awaitReactions(
                (reaction, user) =>
                    user.id === message.author.id && (reaction.emoji.name === '👍' || reaction.emoji.name === '👎'),
                { max: 1, time: 10000 }
            )
            .then(async collection => {
                if (collection.first().emoji.name === '👍') {
                    const sentPoll = await message.channel.send(embed)
                    for (let i = 0; i < pollItems.length; i++) {
                        sentPoll.react(`${this.emojis[i]}`)
                    }
                    confirmMessage.delete()
                } else {
                    confirmMessage.delete()
                    return message.say('> Poll creation cancelled.')
                }
            })
            .catch(() => {
                confirmMessage.delete()
                return message.say('> No response, poll creation cancelled.')
            })
    }
}
