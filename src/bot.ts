import { CommandoClient } from 'discord.js-commando'
import * as dotenv from 'dotenv'
import * as path from 'path'
import { Guild, Role } from 'discord.js'
import classMappings from './classMappings'

dotenv.config()

const MESSAGE_IDS: string[] = [
    process.env.MESSAGE_ONE,
    process.env.MESSAGE_TWO,
    process.env.MESSAGE_THREE,
    process.env.MESSAGE_ALL,
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

client.on('error', e => console.error(e))
client.on('warn', e => console.warn(e))

client.on('messageReactionAdd', (messageReaction, user) => {
    if (user.bot) return
    const message = messageReaction.message
    if (MESSAGE_IDS.includes(message.id)) {
        const role = react_to_role(message.guild, messageReaction.emoji.name)
        if (role) {
            const member = message.guild.members.resolve(user)
            member.roles.add(role)
        }
    }
})

client.on('messageReactionRemove', (messageReaction, user) => {
    if (user.bot) return
    const message = messageReaction.message
    if (MESSAGE_IDS.includes(message.id)) {
        const role = react_to_role(message.guild, messageReaction.emoji.name)
        if (role) {
            const member = message.guild.members.resolve(user)
            member.roles.remove(role)
        }
    }
})

function react_to_role(guild: Guild, react_name: string): Role {
    for (let division in classMappings) {
        if (Object.keys(classMappings[division]).includes(react_name)) {
            return guild.roles.cache.find(role => role.name === classMappings[division][react_name])
        }
    }
    return null
}

client.login(process.env.TOKEN)
