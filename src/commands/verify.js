import EECSCommand from '../EECSCommand'
import { MessageEmbed } from 'discord.js'

export class VerifyCommand extends EECSCommand {
    constructor(client) {
        super(client, {
            name: 'verify',
            group: 'mod',
            memberName: 'verify',
            description: 'instructions for verification',
            dmOnly: true,
            unverifiedOnly: true
        })
    }
    
    execute(message) {
        return message.say(
            new MessageEmbed({
                title: 'Verification',
                description: 'Please submit your Berkeley email for verification.\n' +
                    'Your information will not be stored or tied to your Discord account.'
                color: 0xfdb515
            }).addField('Instructions:', 'Submit your email using\n\`>email [berkeley.edu email]\`\n\n')
        )
    }
}