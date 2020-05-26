import Discord from 'discord.js'
export default {
    name: 'help',
    description: 'help for possible commands',
    args: true,
    flexArgs: true,
    usage: '[command name]',
    execute(message, args, bot) {
        const dmCmds = message.client.dmCmds
        const regCmds = message.client.regCmds
        if (args.length) {
            const command = dmCmds.get(args[0]) || regCmds.get(args[0])
            if (!command) {
                return message.author.send(`> Command \`${args[0]}\` does not exist`)
            }
            const embed = new Discord.MessageEmbed()
                .setColor('fdb515')
                .setTitle(`\`${args[0]}\``)
                .addFields(
                    { name: 'Description:', value: command.description },
                    {
                        name: 'Usage:',
                        value: `\`${bot.PREFIX}${command.name}${command.usage ? ` ${command.usage}` : ''}\``,
                    }
                )
            return message.author.send(embed)
        } else {
            let dm_cmds = ''
            let server_cmds = ''
            dmCmds.forEach(cmd => {
                if (!cmd.hide) dm_cmds += `${cmd.name}\n`
            })
            regCmds.forEach(cmd => {
                if (!cmd.hide) server_cmds += `${cmd.name}\n`
            })
            const embed = new Discord.MessageEmbed()
                .setColor('fdb515')
                .setTitle('Help')
                .setDescription(`Use \`${bot.PREFIX}help [command name]\` for help on a specific command.`)
                .addFields(
                    { name: 'Available DM Commands:', value: dm_cmds },
                    { name: 'Available Server Commands:', value: server_cmds }
                )
            return message.author.send(embed)
        }
    },
}
