import fetch from 'node-fetch'
export default {
    name: 'dadjoke',
    description: 'gets a random dadjoke',
    async execute(message, args, bot) {
        try {
            const j = await fetch("https://icanhazdadjoke.com/", {headers: {Accept: "text/plain"}})
            return message.channel.send(await j.text())
        } catch (error) {
            console.error(error)
        }
    }
}
