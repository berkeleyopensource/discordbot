const fetch = require('node-fetch')
module.exports = {
    name: 'dadjoke',
    description: 'get a random dadjoke!',
    async execute (message, args) {
        j = await fetch("https://icanhazdadjoke.com/", {headers: {Accept: "text/plain"}})
        return message.channel.send(await j.text())
    }
}
