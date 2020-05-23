export default {
    name: 'foo',
    description: 'foo test command',
    hide: true,
    cooldown: 5,
    execute(message, args, bot) {
        return message.channel.send('bar')
    }
}
