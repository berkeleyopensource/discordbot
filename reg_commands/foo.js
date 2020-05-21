export default {
    name: 'foo',
    description: 'foo test command',
    execute (message, args) {
        return message.channel.send('bar')
    }
}
