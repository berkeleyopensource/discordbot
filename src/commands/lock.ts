import EECSCommand from '../EECSCommand'
import { CommandoClient, CommandoMessage } from 'discord.js-commando'
import { Message, PermissionOverwrites, TextChannel } from 'discord.js'

export class LockCommand extends EECSCommand {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'lock',
            group: 'mod',
            memberName: 'lock',
            description: 'locks a channel',
            hidden: true,
            adminOnly: true,
        })
    }

    async execute(message: CommandoMessage, args: string) {
        if (!args) {
            return message.say('> No arguments provided for lock')
        }

        const words = args.split(/\s+/)
        const match = words[0].match(/<#(.*)>/)
        if (!match) {
            return message.say('> Could not find channel!')
        }

        const TARGET_CHANNEL = this.client.channels.resolve(match[1]) as TextChannel
        const po = TARGET_CHANNEL.permissionOverwrites.get(process.env.EVERYONE_ROLE_ID)
        if (po && po.deny.has('SEND_MESSAGES', false)) {
            return message.say('Channel already locked!')
        }

        const embed = {
            title: `Lock Acquired`,
            color: 0xfdb515,
            description:
                `__**Resource:**__ ${match[0]}` +
                (words.length > 1 ? `\n\n__**Reason:**__ ${words.slice(1).join(' ')}` : ''),
        }

        const confirmEmbed = await message.say({ embed })
        const confirmMessage = (await message.say(`> Lock ${match[0]}?`)) as Message
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
                    await this.lock_acquire(po, TARGET_CHANNEL)
                    const STDOUT_CHANNEL = this.client.channels.resolve(process.env.STDOUT_CHANNEL_ID) as TextChannel
                    await STDOUT_CHANNEL.send({ embed })
                    confirmEmbed.delete()
                    confirmMessage.delete()
                } else {
                    confirmEmbed.delete()
                    confirmMessage.delete()
                    return message.say('> Locking cancelled.')
                }
            })
            .catch(() => {
                confirmEmbed.delete()
                confirmMessage.delete()
                return message.say('> No response, locking cancelled.')
            })
    }

    async lock_acquire(po: PermissionOverwrites, channel: TextChannel) {
        if (po) {
            po.update({ SEND_MESSAGES: false })
        } else {
            channel.overwritePermissions([{ id: process.env.EVERYONE_ROLE_ID, deny: ['SEND_MESSAGES'] }])
        }
    }
}
