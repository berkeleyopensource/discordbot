import fetch from 'node-fetch'
import Discord from 'discord.js'
export default {
    name: 'stock',
    description: 'get stock info',
    async execute (message, args) {
        try {
            const j = await (await fetch(`https://finnhub.io/api/v1/quote?symbol=${args[0].toUpperCase()}&token=br3eovvrh5rai6tgh99g`)).text()
            const s = JSON.parse(j)
            const embed = new Discord.MessageEmbed()
                .setColor(s.c - s.pc > 0 ? '#29bf89' : 'f74356')
                .setTitle(`Symbol: ${args[0].toUpperCase()}`)
                .setDescription(`Current Price: $${s.c}\n` + 
                    `Today's Open: $${s.o}\n` + 
                    `Today's Range: $${s.l} - $${s.h}\n` + 
                    `Previous Close: $${s.pc}`)
            return message.channel.send(embed)
        } catch (error) {
            console.error(error)
        }
    }
}
