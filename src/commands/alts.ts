import * as crypto from 'crypto'
import * as Sequelize from 'sequelize'
import EECSCommand from '../EECSCommand'
import { CommandoClient, CommandoMessage } from 'discord.js-commando'
import { MessageEmbed } from 'discord.js'
import { seq, verificationDB } from '../sequelizeDB'

export class AltsCommand extends EECSCommand {
    private readonly regex = /^[A-z0-9._%+-]+@berkeley\.edu$/

    constructor(client: CommandoClient) {
        super(client, {
            name: 'alts',
            group: 'mod',
            memberName: 'alts',
            description: 'mod command to check for verification dupes/alternates',
            hidden: true,
            adminOnly: true,
        })
    }

    async execute(message: CommandoMessage, args: string) {
        if (args) {
            const query = this.regex.test(args) ? await this.queryEmail(args) : await this.queryUserTag(args)
            if (query.length) {
                let contents = ''
                query.forEach(
                    (row: any) =>
                        (contents += `\`${row.user_tag}\` \`${new Date(row.verify_timestamp).toLocaleString()}\`\n`)
                )
                return message.say(
                    new MessageEmbed({
                        title: `Query for \`${args}\``,
                        color: 0x003262,
                    })
                        .addField('Hash:', `\`${query[0].hash}\``)
                        .addField('Result:', contents)
                )
            }
        } else {
            let contents = ''
            const queryAll = await this.queryAllAlts(args)
            if (queryAll.length) {
                queryAll[0].every(
                    (row: any) =>
                        (contents += `\`${row.count} alts\` \`${row.user_tag}\` \`${new Date(
                            row.verify_timestamp
                        ).toLocaleString()}\`\n`)
                )
                return message.say(
                    new MessageEmbed({
                        title: 'Query for all alts',
                        color: 0x003262,
                    }).addField('Result:', contents)
                )
            }
        }
        return message.say(
            new MessageEmbed({
                title: `Query for \`${args}\``,
                description: 'Nothing found.',
                color: 0x003262,
            })
        )
    }

    /**
     * Queries for alts using an email
     * Limited to 10 due to 1024 character limit of Discord Embeds
     */
    async queryEmail(args: string) {
        const md5 = crypto.createHash('md5')
        const rehash = md5.update(process.env.PEPPER + args).digest('hex')
        return await verificationDB.findAll({
            where: {
                hash: rehash,
            },
            order: [['verify_timestamp', 'DESC']],
            limit: 10,
            raw: true,
        })
    }

    /**
     * Queries for alts using a user tag
     * Limited to 10 due to 1024 character limit of Discord Embeds
     */
    async queryUserTag(args: string) {
        const hashquery = await verificationDB.findOne({
            where: { user_tag: args },
            order: [['verify_timestamp', 'DESC']],
            raw: true,
        })
        if (hashquery) {
            return await verificationDB.findAll({
                where: { hash: hashquery.hash },
                order: [['verify_timestamp', 'DESC']],
                limit: 10,
                raw: true,
            })
        }
        return []
    }

    /**
     * Queries for all recent alts
     */
    async queryAllAlts(args: string) {
        return await seq.query(
            'SELECT *, COUNT(hash) AS count ' +
                'FROM (SELECT * FROM `verification` ORDER BY verify_timestamp DESC) ' +
                'GROUP BY hash ' +
                'HAVING COUNT(*) > 1 ' +
                'LIMIT 5'
        )
    }
}
