import { Command } from 'discord.js-commando'

/**
 * The default Commando command, but with some server specific features added. Use `execute()` instead of run in commands that extend this.
 */
export default class EECSCommand extends Command {
    /**
     * @param {Commando.CommandoClient} client 
     * @param {object} info the same as Commando.CommandInfo but with three extra optional parameters: `unverifiedOnly`, `adminOnly`, and `dmOnly`
     */
    constructor(client, info) {
        this.dmOnly = info.dmOnly
        this.unverifiedOnly = info.unverifiedOnly
        this.adminOnly = info.adminOnly
        super(client, info)
    }

    async run(message, args, fromPattern, result) {
        let member = this.client.guilds.resolve(process.env.GUILD_ID).member(message.author)
        if (!member)
            return message.say('> You\'re not in the EECS server. How\'d you even find this bot?')

        if (this.dmOnly && message.channel.type != 'dm') {
            return message.say('> Please join the EECS Discord server before using any commands')
        }

        if (this.unverifiedOnly && member.roles.cache.has(process.env.VERIFIED_ROLE_ID)) {
            return message.say(`> User ${message.author.tag} is already verified.`)
        }

        if (this.adminOnly && !this.client.guilds.resolve(process.env.GUILD_ID).roles.cache.has(process.env.ADMIN_ROLE_ID)) {
            return message.say('> You must be a server admin to use this command')
        }

        return this.execute(message, args, fromPattern, result)
    }

    /**
     * The normal `Command.run()` method but with a few custom checks
     */
    async execute(message, args, fromPattern, result) {
		throw new Error(`${this.constructor.name} doesn't have a run() method.`)
	}
}