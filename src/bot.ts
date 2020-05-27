import { CommandoClient } from 'discord.js-commando'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config()

const client = new CommandoClient({ commandPrefix: process.env.PREFIX })

client.registry
    .registerGroups([
        ['mod', 'Moderation'],
        ['util', 'Utility'],
        ['fun', 'Fun'],
        ['misc', 'Miscellaneous']
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'))


client.once('ready', () => {
    console.log('\x1b[36m%s\x1b[0m', 'bot active!')
})

client.on('error', e => console.error(e))
client.on('warn', e => console.warn(e))

client.on('messageReactionAdd', (messageReaction, user) => {
    // TODO: y'all, i have no idea what the original code was supposed to do. i'll leave this to you guys :P
})

client.on('messageReactionRemove', (messageReaction, user) => {
    // TODO: y'all, i have no idea what the original code was supposed to do. i'll leave this to you guys :P
})

client.login(process.env.TOKEN)