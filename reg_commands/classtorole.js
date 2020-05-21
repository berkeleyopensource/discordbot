export default {
    name: 'classtorole',
    description: 'temporary command',
    hide: true,
    execute(message, args, bot) {
        if (!bot.isMod(message.author.id)) return
        return bot.roleMessages(message)
    }
}
