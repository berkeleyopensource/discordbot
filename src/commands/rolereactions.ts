import EECSCommand from '../EECSCommand'
import { CommandoClient, CommandoMessage } from 'discord.js-commando'
import classMappings from '../classMappings'

export class ClassToRoleCommand extends EECSCommand {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'rolereactions',
            group: 'util',
            memberName: 'classtorole',
            description: 'temporary command',
            hidden: true,
            adminOnly: true,
        })
    }

    execute(message: CommandoMessage) {
        async function addReactions(messageID: string, name: string, mappings: any) {
            const targetMessage = await message.channel.messages.fetch(messageID)
            const rawComparator = (a: string, b: string) => {
                function raw(s: string) {
                    return s.replace(/[a-z_]/, '')
                }
                return parseInt(raw(a)) - parseInt(raw(b))
            }
            for (let emojiName of Object.keys(mappings).sort(rawComparator)) {
                try {
                    const emoji = message.guild.emojis.cache.find(emoji => emoji.name === emojiName)
                    await targetMessage.react(emoji.id)
                } catch (error) {
                    console.log(`Emoji needed for ${emojiName} (${name})`)
                }
            }
        }
        Promise.all([
            addReactions('temp', 'EECS Lower Division', classMappings.LD),
            addReactions('temp', 'CS Upper Division', classMappings.CSUD),
            addReactions('temp', 'EE Upper Division', classMappings.EEUD),
        ])
        return message.direct('Complete')
    }
}
