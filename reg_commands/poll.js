import Discord from 'discord.js'
export default {
    name: 'poll',
    description: 'starts a poll',
    args: true,
    flexArgs: true,
    usage: '{[question]} {[poll item 1]} {[poll item 2]} ...',
    cooldown: 10,
    async execute(message, args, bot) {
        let emojis = ['0⃣', '1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣']
        const pollItems = message.content.slice(bot.PREFIX.length + 5).split(/\s+(?={)/)
        const question = pollItems.shift().slice(1, -1)
        if (pollItems.length > 10) {
            await message.author.send(`> Your input: \`${message.content}\``)
            return message.author.send('Poll value limit is 10')
        }
        let contents = ''
        for (let i = 0; i < pollItems.length; i++) {
            contents += `${emojis[i]} - \`${pollItems[i].slice(1, -1)}\`\n`
        }
        const embed = new Discord.MessageEmbed()
            .setColor('fdb515')
            .setTitle(`\`${question}\``)
            .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
            .setDescription(contents)
        if (!/\{|}/.test(message.content)) {
            message.delete()
            await message.author.send('> Items for `>poll` should be in curly brackets {}')
            await message.author.send('> Example: `>poll {Beep?} {Beep} {Boop}`')
            return message.author.send(`> Your input: \`${message.content}\``)
        }
        await message.author.send(embed)
        await message.author.send(`> Your input: \`${message.content}\``)
        const confirmMessage = await message.author.send('> Does this look good?')
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
                        sentPoll.react(`${emojis[i]}`)
                    }
                    confirmMessage.delete()
                } else {
                    confirmMessage.delete()
                    return message.author.send('> Poll creation cancelled.')
                }
            })
            .catch(() => {
                confirmMessage.delete()
                return message.author.send('> No response, poll creation cancelled.')
            })
    },
}
