import * as dotenv from 'dotenv';
import * as Sequelize from 'sequelize';
import { client, updateEmojiDB } from './bot';
import { CronJob } from 'cron';
import { MessageEmbed, TextChannel } from 'discord.js';

dotenv.config()

export const seq = new Sequelize.Sequelize('database', 'user', null, {
    dialect: 'sqlite',
    storage: './data.sqlite',
    logging: false,
    define: {
        timestamps: false,
        freezeTableName: true,
    },
})

export const verificationDB: any = seq.define('verification', {
    hash: Sequelize.TEXT,
    user_tag: Sequelize.TEXT,
    verify_timestamp: Sequelize.INTEGER,
})
verificationDB.removeAttribute('id')

export const emoteDB: any = seq.define('emotes', {
    emoji_name: Sequelize.TEXT,
    timestamp: Sequelize.INTEGER,
})
emoteDB.removeAttribute('id')

export const emoteDBFull: any = seq.define('emotes_full', {
    emoji_name: Sequelize.TEXT,
    count: Sequelize.INTEGER,
})
emoteDBFull.removeAttribute('id')

verificationDB.sync().then(console.log('User database synced!'))
emoteDB.sync().then(console.log('Weekly emote database synced!'))
emoteDBFull.sync().then(console.log('Full emote database synced!'))

const job = new CronJob(process.env.CRON_TIMING, async () => {
    const LOG_CHANNEL = client.channels.resolve(process.env.LOG_CHANNEL_ID) as TextChannel
    const query = await emoteDB.findAll({
        group: 'emoji_name',
        attributes: [
            ['emoji_name', 'name'],
            [Sequelize.fn('COUNT', '*'), 'count'],
        ],
        order: [[Sequelize.col('count'), 'DESC']],
        raw: true,
    })
    let countContents = ''
    let limit = 0
    if (query.length) {
        for (const row of query) {
            await emoteDBFull
                .findOne({
                    where: { emoji_name: row.name },
                })
                .then((result: any) => {
                    if (result) {
                        const before = result.count
                        result.update({ count: result.count + row.count })
                        if (limit < 10) {
                            const emoji = LOG_CHANNEL.guild.emojis.cache.find(e => e.name === row.name)
                            countContents += (emoji ? emoji.toString() : '') + ` \`${before} => ${result.count}\`\n`
                            limit++
                        }
                    }
                })
                .catch((e: any) => {
                    console.error(e)
                    countContents += `\`error occured\` trying to find ${row.name}\n`
                })
        }
    } else {
        countContents = 'none'
    }
    emoteDB.sync({ force: true }).then(console.log('Weekly emote database cleaned!'))
    console.log('Full emote database counts updated!')
    await updateEmojiDB()
    return LOG_CHANNEL.send(
        new MessageEmbed({
            title: 'Full emote database updated + weekly emote database cleaned!',
            color: 0x003262,
        }).addField('Top 10 Count Increases:', countContents)
    )
})

job.start()
