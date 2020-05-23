import fs from 'fs'
import Discord from 'discord.js'
const {EMAIL_USER} = JSON.parse(fs.readFileSync("config.json"))
export default {
    name: 'email',
    description: 'submits email for verification',
    args: true,
    numArgs: 1,
    usage: '[email]',
    hide: true,
    cooldown: 15,
    async execute(message, args, bot) {
        if (bot.isVerified(message.author.id)) return message.channel.send(`> User ${message.author.tag} is already verified.`)
        const regex = /^[A-z0-9._%+-]+@berkeley\.edu$/
        if (!regex.test(args[0])) return message.channel.send('> Please enter a valid Berkeley email')
        const code = bot.generateCode()
        const info = {
            from: EMAIL_USER,
            to: args[0],
            subject: 'EECS Discord Verification Code',
            text: `Please use the code ${code} to complete your verification.\nThis code will expire in five minutes.`
        }
        try {
            await bot.transporter.sendMail(info)
            console.log(`Code successfully sent to ${args[0]} for user ${message.author.tag}`)
            bot.queueCode(message, code)
        } catch (error) {
            console.error(`Code failed to send to ${args[0]} for user ${message.author.tag}`)
            return message.channel.send(`> Error sending email to \`${args[0]}\``)
        }
        const embed = new Discord.MessageEmbed()
            .setColor('#fdb515')
            .setTitle('Email Received')
            .setDescription(`Verification code successfully sent to \`${args[0]}\`\n\n` +
                'Once you receive your temporary verification code, please verify using\n' +
                '\`>code [verification code]\`')
        return message.channel.send(embed)
    }
}
