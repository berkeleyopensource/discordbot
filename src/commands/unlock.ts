import EECSCommand from '../EECSCommand'
import { CommandoClient, CommandoMessage } from 'discord.js-commando'
import { Message, MessageEmbed, PermissionOverwrites, Role, TextChannel } from 'discord.js'

export class LockCommand extends EECSCommand {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'unlock',
            group: 'mod',
            memberName: 'unlock',
            description: 'unlocks a channel',
            hidden: true,
            adminOnly: true
        })
    }

    async execute(message: CommandoMessage, args: string) {
        if (!args) {
            return message.say('> No arguments provided for lock')
        }

        const match = args.match(/<#(.*)>/)
        if (!match) {
            return message.say(`> Could not find channel!`)
        }

        const TARGET_CHANNEL = this.client.channels.resolve(match[1]) as TextChannel
        const po = TARGET_CHANNEL.permissionOverwrites.get(process.env.EVERYONE_ROLE_ID)
        if (!po || !po.deny.has('SEND_MESSAGES', true)) {
            return message.say('Channel already unlocked!')
        }

        const embed = {
            title: `Lock Released`,
            color: 0x003262,
            description: `__**Resource:**__ ${match[0]}`
        }

        const confirmEmbed = await message.say({ embed })
        const confirmMessage = (await message.say(`> Unlock ${match[0]}?`)) as Message
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
                    await this.lock_release(po, TARGET_CHANNEL)
                    const STDOUT_CHANNEL = this.client.channels.resolve(process.env.STDOUT_CHANNEL_ID) as TextChannel
                    await STDOUT_CHANNEL.send({ embed })
                    confirmEmbed.delete()
                    confirmMessage.delete()
                } else {
                    confirmEmbed.delete()
                    confirmMessage.delete()
                    return message.say('> Unlocking cancelled.')
                }
            })
            .catch(() => {
                confirmEmbed.delete()
                confirmMessage.delete()
                return message.say('> No response, unlocking cancelled.')
            })

    }

    async lock_release(po: PermissionOverwrites, channel: TextChannel) {
        if (po) {
            po.update({SEND_MESSAGES: null})
        }
    }
}
