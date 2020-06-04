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

    async execute(message: CommandoMessage) {
        const SHELLGUILD = this.client.guilds.resolve(process.env.SHELL_GUILD_ID)
        async function addReactions(messageID: string, name: string, mappings: any, shell: boolean) {
            const targetMessage = await message.channel.messages.fetch(messageID)
            const rawComparator = (a: string, b: string) => {
                function raw(s: string) {
                    return s.replace(/[a-z_]/, '')
                }
                return parseInt(raw(a)) - parseInt(raw(b))
            }
            for (let emojiName of Object.keys(mappings).sort(rawComparator)) {
                try {
                    if (shell) {
                        const emoji = SHELLGUILD.emojis.cache.find(emoji => emoji.name === emojiName)
                        await targetMessage.react(emoji.id)
                    } else {
                        targetMessage.react(emojiName)
                    }
                } catch (error) {
                    console.log(`Emoji needed for ${emojiName} (${name})`)
                }
            }
        }
        await Promise.all([
            addReactions(process.env.MESSAGE_STATUS, 'Status', classMappings.STATUS, false),
            addReactions(process.env.MESSAGE_ALL, 'Lower/Upper Division View', classMappings.VIEW, false),
            addReactions(process.env.MESSAGE_EECS_LD, 'EECS Lower Division', classMappings.LD, true),
            addReactions(process.env.MESSAGE_CS_UD, 'CS Upper Division', classMappings.CSUD, true),
            addReactions(process.env.MESSAGE_EE_UD, 'EE Upper Division', classMappings.EEUD, true),
        ])
        return message.direct('Role Reactions Complete')
    }
}
