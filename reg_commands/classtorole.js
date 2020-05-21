import bot from '../bot.js'
export default {
    name: 'classtorole',
    description: 'temp role',
    execute(message, args) {
        if (!bot.isMod(message.author.id)) return
        bot.roleMessages(message)
    }
}
