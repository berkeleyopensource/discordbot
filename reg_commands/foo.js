export default {
    name: 'foo',
    description: 'foo test command',
    cooldown: 5,
    execute (message, args) {
        return message.channel.send('bar')
    }
}
