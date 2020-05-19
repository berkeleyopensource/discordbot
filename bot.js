const fs = require('fs')
const CLASS_TO_ROLE = JSON.parse(fs.readFileSync("class_to_role.json"))
var MESSAGE_ID
const config = JSON.parse(fs.readFileSync("config.json"));
const {PREFIX, TOKEN} = config

const Discord = require('discord.js')
const client = new Discord.Client()

client.once('ready', () => {
    client.user.set
    console.log('bot active!')
})

client.login(TOKEN)

client.on('error', e => console.error(e))
client.on('warn', e => console.warn(e))

client.on('message', message => {
    if (message.author.bot || !message.content.startsWith(PREFIX)) return
    const args = message.content.slice(PREFIX.length).split(/\s+/)
    const commandName = args.shift().toLowerCase()

    if (commandName === 'foo') message.channel.send('bar')
    if (commandName === "classtorole") roleMessage(message)
})

async function roleMessage(message) {
    const selectionMessage = await message.channel.send("Roles")
    MESSAGE_ID = selectionMessage.id
    const rawComparator = (a, b) => {
        function raw(s) {
            return s.replace(/[a-z_]/, '')
        }
        return raw(a) - raw(b)
    }
    for (emojiName of Object.keys(CLASS_TO_ROLE).sort(rawComparator)) {
        try {
            const emoji = message.guild.emojis.cache.find(emoji => emoji.name === emojiName)
            await selectionMessage.react(emoji)
        } catch (error) {
            console.log("Need emoji for " + emojiName)
        }
    }
}

function react_to_role(guild, react_name) {
    if (Object.keys(CLASS_TO_ROLE).includes(react_name)) {
        console.log(CLASS_TO_ROLE[react_name])
        return guild.roles.cache.find(role => role.name === CLASS_TO_ROLE[react_name])
    }
    return null
}

client.on('messageReactionAdd', (messageReaction, user) => {
    if (!MESSAGE_ID || user.bot) return;
    const message = messageReaction.message
    if (MESSAGE_ID == message.id) {
        const role = react_to_role(message.guild, messageReaction.emoji.name)
        if (role) {
            const member = message.guild.members.resolve(user);
            member.roles.add(role).catch(console.error);
        }
    }
})

client.on('messageReactionRemove', (messageReaction, user) => {
    if (!MESSAGE_ID || user.bot) return;
    const message = messageReaction.message
    if (MESSAGE_ID == message.id) {
        const role = react_to_role(message.guild, messageReaction.emoji.name)
        if (role) {
            const member = message.guild.members.resolve(user);
            member.roles.remove(role).catch(console.error);
        }
    }
})
