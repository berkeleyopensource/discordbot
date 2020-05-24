import Discord from 'discord.js'
export default {
    name: 'code',
    description: 'submits code for verification',
    args: true,
    numArgs: 1,
    usage: '[code]',
    hide: true,
    async execute(message, args, bot) {
        if (bot.isVerified(message.author.id))
            return message.channel.send(`> User ${message.author.tag} is already verified.`)
        if (isNaN(args[0])) return message.channel.send('> Please enter a valid code')
        if (await bot.verifyCode(message, args[0])) {
            const embed = new Discord.MessageEmbed()
                .setColor('#fdb515')
                .setTitle('Verification Successful')
                .setDescription(`User \`${message.author.tag}\` has been verified.`)
            return message.channel.send(embed)
        }
    },
}
