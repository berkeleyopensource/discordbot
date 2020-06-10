import EECSCommand from '../EECSCommand'
import { queryE, queryU } from '../verification'
import { MessageEmbed } from 'discord.js'
import { CommandoClient, CommandoMessage, Command } from 'discord.js-commando'

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
        const query = this.regex.test(args) ? await queryE(args) : await queryU(args)
        if (query.length) {
            let contents = ''
            query.every((row: any) => (contents += `\`${row.user_tag}\` \`${new Date(row.time)}\`\n`))
            return message.say(
                new MessageEmbed({
                    title: `Query for \`${args}\``,
                    color: 0x003262,
                })
                    .addField('Hash:', `\`${query[0].hash}\``)
                    .addField('Result:', contents)
            )
        } else {
            return message.say(
                new MessageEmbed({
                    title: `Query for \`${args}\``,
                    description: 'Nothing found.',
                    color: 0x003262,
                })
            )
        }
    }
}
