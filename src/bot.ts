import * as dotenv from 'dotenv'
import * as path from 'path'
import { CommandoClient } from 'discord.js-commando'
import { Guild, Role, TextChannel, MessageReaction, Message, User } from 'discord.js'
import classMappings from './classMappings'

dotenv.config()

const MESSAGE_IDS: string[] = [
    process.env.MESSAGE_ALL,
    process.env.MESSAGE_EECS_LD,
    process.env.MESSAGE_CS_UD,
    process.env.MESSAGE_EE_UD,
    process.env.MESSAGE_POSTGRAD,
]

const client = new CommandoClient({ commandPrefix: process.env.PREFIX })

client.registry
    .registerGroups([
        ['mod', 'Moderation'],
        ['util', 'Utility'],
        ['fun', 'Fun'],
        ['misc', 'Miscellaneous'],
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'))
    .unregisterCommand(client.registry.findCommands('unknown-command')[0])

client.once('ready', () => {
    console.log('\x1b[36m%s\x1b[0m', 'bot active!')
})

client.login(process.env.TOKEN)

client.on('error', e => console.error(e))
client.on('warn', e => console.warn(e))

client.on('messageReactionAdd', (messageReaction, user) => {
    if (user.bot) return
    if (MESSAGE_IDS.includes(messageReaction.message.id)) {
        return changeRole(messageReaction.message, user, messageReaction.emoji.name, true)
    }
})

client.on('messageReactionRemove', (messageReaction, user) => {
    if (user.bot) return
    if (MESSAGE_IDS.includes(messageReaction.message.id)) {
        return changeRole(messageReaction.message, user, messageReaction.emoji.name, false)
    }
})

client.on(
    'raw',
    (packet: {
        t: string
        d: {
            user_id: string
            message_id: string
            emoji: { name: string; id: string }
            channel_id: string
            guild_id: string
        }
    }) => {
        if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return
        if (packet.d.guild_id != process.env.GUILD_ID) return
        const channel = client.channels.resolve(packet.d.channel_id) as TextChannel
        if (channel.messages.cache.has(packet.d.message_id)) return
        channel.messages.fetch(packet.d.message_id).then(message => {
            const cachedmReaction = message.reactions.cache.get(packet.d.emoji.name)
            const mReaction = new MessageReaction(
                client,
                {
                    message: message,
                    emoji: { name: packet.d.emoji.name },
                    count: cachedmReaction ? cachedmReaction.count : 1,
                },
                message
            )
            if (packet.t === 'MESSAGE_REACTION_ADD') {
                client.emit('messageReactionAdd', mReaction, client.users.resolve(packet.d.user_id))
            }
            if (packet.t === 'MESSAGE_REACTION_REMOVE') {
                client.emit('messageReactionRemove', mReaction, client.users.resolve(packet.d.user_id))
            }
        })
    }
)

function changeRole(message: Message, user: User, emojiName: string, addRole: boolean) {
    const role = react_to_role(message.guild, emojiName)
    console.log(
        '\x1b[36m%s\x1b[0m',
        `${user.tag}: ${addRole ? 'Added ' : 'Removed '}role ${role.name}`
    )
    if (role) {
        const member = message.guild.members.resolve(user)
        if (addRole) {
            member.roles.add(role)
        } else {
            member.roles.remove(role)
        }
    }
}

function react_to_role(guild: Guild, react_name: string): Role {
    for (let division in classMappings) {
        if (Object.keys(classMappings[division]).includes(react_name)) {
            return guild.roles.cache.find(role => role.name === classMappings[division][react_name])
        }
    }
    return null
}
