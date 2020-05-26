import CLASS_TO_ROLE from '../class_to_role.js'
export default {
    name: 'classtorole',
    description: 'temporary command',
    hide: true,
    execute(message, args, bot) {
        if (!bot.isMod(message.author.id)) return
        async function createRoleMessage(title, class_to_role) {
            const selectionMessage = await message.channel.send(title)
            bot.MESSAGE_IDS.push(selectionMessage.id)
            const rawComparator = (a, b) => {
                function raw(s) {
                    return s.replace(/[a-z_]/, '')
                }
                return raw(a) - raw(b)
            }
            for (let emojiName of Object.keys(class_to_role).sort(rawComparator)) {
                try {
                    const emoji = message.guild.emojis.cache.find(emoji => emoji.name === emojiName)
                    await selectionMessage.react(emoji.id)
                } catch (error) {
                    console.log(`Emoji needed for ${emojiName} (${title})`)
                }
            }
        }
        Promise.all([
            createRoleMessage('EECS Lower Division', CLASS_TO_ROLE.LD),
            createRoleMessage('CS Upper Division', CLASS_TO_ROLE.CSUD),
            createRoleMessage('EE Upper Division', CLASS_TO_ROLE.EEUD),
        ])
    },
}
