export default {
    name: 'classtorole',
    description: 'temp role',
    execute(message, args, bot) {
        if (!bot.isMod(message.author.id)) return
        bot.roleMessages(message)
    }
}
