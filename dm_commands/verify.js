import Discord from 'discord.js'
export default {
    name: 'verify',
    description: 'instructions for verification',
    args: false,
    execute(message, args, bot) {
        const embed = new Discord.MessageEmbed()
            .setColor('#fdb515')
            .setTitle('Verification')
            .setDescription('Please submit your Berkeley email for verification.\n' +
                            'Your information will not be stored or tied to your Discord account.')
            .addField('Instructions:', 'Submit your email using\n\`>email [berkeley.edu email]\`\n\n')
        return message.channel.send(embed)
    }
}
