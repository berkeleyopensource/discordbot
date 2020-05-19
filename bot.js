const fs = require('fs')
const CLASS_TO_ROLE = JSON.parse(fs.readFileSync("class_to_role.json"))
const EECS_LOWER_DIV = CLASS_TO_ROLE.LD
const CS_UPPER_DIV = CLASS_TO_ROLE.CSUD
const EE_UPPER_DIV = CLASS_TO_ROLE.EEUD
var MESSAGE_IDS = []
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
    if (commandName === "classtorole") roleMessages(message)
})

function roleMessages(message) {
    let createRoleMessage = async (title, class_to_role) => {
        const selectionMessage = await message.channel.send(title)
        MESSAGE_IDS.push(selectionMessage.id)
        const rawComparator = (a, b) => {
            function raw(s) {
                return s.replace(/[a-z_]/, '')
            }
            return raw(a) - raw(b)
        }
        for (emojiName of Object.keys(class_to_role).sort(rawComparator)) {
            try {
                const emoji = message.guild.emojis.cache.find(emoji => emoji.name === emojiName)
                await selectionMessage.react(emoji.id)
            } catch (error) {
                console.log(`Emoji needed for ${emojiName} (${title})`)
            }
        }
    }
    Promise.all([createRoleMessage("EECS Lower Division", EECS_LOWER_DIV),
    createRoleMessage("CS Lower Division", CS_UPPER_DIV),
    createRoleMessage("EE Lower Division", EE_UPPER_DIV)])
}

function react_to_role(guild, react_name) {
    for (d in CLASS_TO_ROLE) {
        const division = CLASS_TO_ROLE[d]
        if (Object.keys(division).includes(react_name)) {
            return guild.roles.cache.find(role => role.name === division[react_name])
        }
    }
    return null
}

client.on('messageReactionAdd', (messageReaction, user) => {
    if (!MESSAGE_IDS.length || user.bot) return;
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
    if (!MESSAGE_IDS.length || user.bot) return;
    const message = messageReaction.message
    if (MESSAGE_IDS.includes(message.id)) {
        const role = react_to_role(message.guild, messageReaction.emoji.name)
        if (role) {
            const member = message.guild.members.resolve(user)
            member.roles.remove(role)
        }
    }
})
