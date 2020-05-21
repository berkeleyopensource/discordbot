const bot = require('../bot.js')
module.exports = {
    name: 'classtorole',
    description: 'temp role',
    execute(message, args) {
        //if (!bot.isMod(message.author.id)) return
        bot.roleMessages(message)
    }
    
}