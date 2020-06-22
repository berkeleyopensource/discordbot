import * as Sequelize from 'sequelize'
import EECSCommand from '../EECSCommand'
import { CommandoClient, CommandoMessage } from 'discord.js-commando'
import { emoteDB, emoteDBFull } from '../sequelizeDB'
import { MessageEmbed, TextChannel } from 'discord.js'

export class EmotesCommand extends EECSCommand {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'emotes',
            group: 'mod',
            memberName: 'emotes',
            description: 'mod command to check emotes usage',
            hidden: true,
            adminOnly: true,
        })
    }

    async execute(message: CommandoMessage, args: string) {
        const LOG_CHANNEL = this.client.channels.resolve(process.env.LOG_CHANNEL_ID) as TextChannel
        const EMOJICACHE = LOG_CHANNEL.guild.emojis.cache
        const contentString = (query: any) => {
            let content = ''
            if (!query.length) return 'none'
            query.forEach((row: any) => {
                const emoji = EMOJICACHE.find(e => e.name === row.emoji_name)
                content += (emoji ? emoji.toString() : '') + ` \`${row.count}\`\n`
            })
            return content
        }
        const oneDayAgo = Date.now() - 86400000
        const day10 = await emoteDB.findAll({
            group: 'emoji_name',
            where: { timestamp: { [Sequelize.Op.gt]: oneDayAgo } },
            attributes: ['emoji_name', [Sequelize.fn('COUNT', '*'), 'count']],
            order: [[Sequelize.col('count'), 'DESC']],
            limit: 10,
            raw: true,
        })
        const week10 = await emoteDB.findAll({
            group: 'emoji_name',
            attributes: ['emoji_name', [Sequelize.fn('COUNT', '*'), 'count']],
            order: [[Sequelize.col('count'), 'DESC']],
            limit: 10,
            raw: true,
        })
        const top10 = await emoteDBFull.findAll({
            order: [['count', 'DESC']],
            limit: 10,
            raw: true,
        })
        const bot10 = await emoteDBFull.findAll({
            order: [['count', 'ASC']],
            limit: 10,
            raw: true,
        })
        const day10contents = contentString(day10),
            week10contents = contentString(week10),
            top10contents = contentString(top10),
            bot10contents = contentString(bot10)
        await message.say(
            new MessageEmbed({
                title: 'Emote stats',
                color: 0x003262,
                fields: [
                    { name: 'Day Top 10:', value: day10contents, inline: true },
                    { name: 'Week Top 10:', value: week10contents, inline: true },
                ],
            })
        )
        return message.say(
            new MessageEmbed({
                title: 'All-time emote stats',
                color: 0x003262,
                fields: [
                    { name: 'Top 10:', value: top10contents, inline: true },
                    { name: 'Bottom 10:', value: bot10contents, inline: true },
                ],
            })
        )
    }
}
