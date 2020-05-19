const fs = require('fs')
const config = JSON.parse(fs.readFileSync("config.json"));
const {PREFIX, TOKEN} = config

const Discord = require('discord.js')
const client = new Discord.Client()

client.once('ready', () => {
    client.user.set
    console.log('bot active!')
})

client.login(TOKEN)

client.on('message', message => {
    if (message.author.bot || !message.content.startsWith(PREFIX)) return
    const args = message.content.slice(PREFIX.length).split(/\s+/)
    const commandName = args.shift().toLowerCase()

    if (commandName === 'foo') message.channel.send('bar')
})
