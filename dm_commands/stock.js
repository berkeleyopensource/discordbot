import fetch from 'node-fetch'
export default {
    name: 'stock',
    description: 'get stock info',
    async execute (message, args) {
        try {
            const j = await (await fetch(`https://finnhub.io/api/v1/quote?symbol=${args[0].toUpperCase()}&token=br3eovvrh5rai6tgh99g`)).text()
            const s = JSON.parse(j)
            let ret = `Symbol: ${args[0].toUpperCase()}
            Current Price: $${s['c']}
            Today's Open: $${s['o']}
            Today's Range: $${s['l']} - $${s['h']}
            Previous Close: $${s['pc']}
            `
            return message.channel.send(ret)
        } catch (error) {
            console.error(error)
        }
    }
}
