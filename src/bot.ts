import * as dotenv from 'dotenv'
import * as path from 'path'
import classMappings from './classMappings'
import { CommandoClient } from 'discord.js-commando'
import { emoteDB, emoteDBFull } from './sequelizeDB'
import {
    Guild,
    Role,
    TextChannel,
    MessageReaction,
    Message,
    User,
    MessageEmbed,
    Collection,
    GuildEmoji,
} from 'discord.js'

dotenv.config()

const MESSAGE_IDS: string[] = [
    process.env.MESSAGE_STATUS,
    process.env.MESSAGE_ALL,
    process.env.MESSAGE_EECS_LD,
    process.env.MESSAGE_CS_UD,
    process.env.MESSAGE_EE_UD,
]

export const client = new CommandoClient({ commandPrefix: process.env.PREFIX })

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

console.log('Commands loaded!')

let guildEmojis: Collection<string, GuildEmoji>

client.once('ready', async () => {
    const updated = await updateEmojiDB()
    console.log('\x1b[36m%s\x1b[0m', 'bot active!')
})

client.login(process.env.TOKEN)

client.on('error', e => console.error(e))
client.on('warn', e => console.warn(e))

client.on('message', async message => {
    if (message.author.bot || !message.guild || message.guild.id != process.env.GUILD_ID) return
    const matches = message.content.match(/<:.+?:\d{18}>/g)
    if (matches && matches.length) {
        for (const emojiUnicode of matches) {
            const emojiName = emojiUnicode.match(/(?<=:)(.+)(?=:)/g)[0]
            const emojiID = emojiUnicode.match(/(?<=[^<]:)(.+)(?=>)/g)[0]
            if (guildEmojis.has(emojiID)) {
                await emoteDB.create({
                    emoji_name: emojiName,
                    timestamp: message.createdTimestamp,
                })
            }
        }
    }
})

client.on('messageReactionAdd', async (messageReaction, user) => {
    if (user.bot || !messageReaction.message.guild || messageReaction.message.guild.id != process.env.GUILD_ID) return
    if (MESSAGE_IDS.includes(messageReaction.message.id)) {
        return changeRole(messageReaction.message, user, messageReaction.emoji.name, true)
    }
    if (guildEmojis.has(messageReaction.emoji.id)) {
        await emoteDB.create({
            emoji_name: messageReaction.emoji.name,
            timestamp: Date.now(),
        })
    }
})

client.on('messageReactionRemove', (messageReaction, user) => {
    if (user.bot || messageReaction.message.guild.id != process.env.GUILD_ID) return
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

client.on('emojiCreate', async emoji => {
    console.log(`${emoji.name} created`)
    await emoteDBFull.create({
        emoji_name: emoji.name,
        count: 0,
    })
})

client.on('emojiDelete', async emoji => {
    console.log(`${emoji.name} deleted from server`)
    await emoteDBFull
        .findOne({
            where: { emoji_name: emoji.name },
        })
        .then((result: any) => result.destroy())
})

client.on('emojiUpdate', async (oldEmoji, newEmoji) => {
    console.log(`${oldEmoji.name} updated to ${newEmoji.name}`)
    await emoteDBFull
        .findOne({
            where: { emoji_name: oldEmoji.name },
        })
        .then((result: any) => result.destroy())
    await emoteDBFull.create({
        emoji_name: newEmoji.name,
        count: 0,
    })
})

function changeRole(message: Message, user: User, emojiName: string, addRole: boolean) {
    const role = react_to_role(message.guild, emojiName)
    if (role) {
        const member = message.guild.members.resolve(user)
        if (member == null) {
            return
        }
        if (addRole) {
            member.roles.add(role)
        } else {
            member.roles.remove(role)
        }
        console.log('\x1b[36m%s\x1b[0m', `${user.tag}: ${addRole ? 'Added ' : 'Removed '}role ${role.name}`)
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

export async function updateEmojiDB() {
    guildEmojis = client.guilds.resolve(process.env.GUILD_ID).emojis.cache
    const updated = []
    for (const pair of guildEmojis) {
        const guildEmoji = pair[1]
        if (
            (
                await emoteDBFull.findOrCreate({
                    where: { emoji_name: guildEmoji.name },
                    defaults: {
                        emoji_name: guildEmoji.name,
                        count: 0,
                    },
                })
            )[1]
        ) {
            updated.push(guildEmoji.name)
        }
    }
    console.log('Emote database updated: ', updated)
    return updated
}
