import help from '../dm_commands/help.js'
export default {
    name: 'help',
    args: true,
    flexArgs: true,
    hide: true,
    execute(message, args, bot) {
        return help.execute(message, args, bot)
    }
}