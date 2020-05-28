import EECSCommand from '../EECSCommand'
import { CommandoClient, CommandoMessage } from 'discord.js-commando'
import classMappings from '../classMappings'

export class ClassToRoleCommand extends EECSCommand {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'rolereactions',
            group: 'mod',
            memberName: 'rolereactions',
            description: 'one time use',
            hidden: true,
            adminOnly: true,
        })
    }

    execute(message: CommandoMessage) {
        const SHELLGUILD = this.client.guilds.resolve(process.env.SHELL_GUILD_ID)
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
                    const emoji = SHELLGUILD.emojis.cache.find(emoji => emoji.name === emojiName)
                    await targetMessage.react(emoji.id)
                } catch (error) {
                    console.log(`Emoji needed for ${emojiName} (${name})`)
                }
            }
        }
        Promise.all([
            addReactions(process.env.MESSAGE_ID_ONE, 'EECS Lower Division', classMappings.LD),
            addReactions(process.env.MESSAGE_ID_TWO, 'CS Upper Division', classMappings.CSUD),
            addReactions(process.env.MESSAGE_ID_THREE, 'EE Upper Division', classMappings.EEUD),
        ])
        return message.direct('Complete')
    }
}
