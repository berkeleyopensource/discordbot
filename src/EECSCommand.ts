import { Command, CommandoClient, CommandInfo, CommandoMessage, ArgumentCollectorResult } from 'discord.js-commando'
import { Message } from 'discord.js';

/**
 * The default Commando command, but with some server specific features added. Use `execute()` instead of run in commands that extend this.
 */
export default class EECSCommand extends Command {
    private dmOnly: boolean;
    private unverifiedOnly: boolean;
    private adminOnly: boolean;

    constructor(client: CommandoClient, info: EECSCommandInfo) {
        super(client, info)
        this.dmOnly = info.dmOnly
        this.unverifiedOnly = info.unverifiedOnly
        this.adminOnly = info.adminOnly
    }

    async run(message: CommandoMessage, args: Object | string | Array<string>, fromPattern: boolean, result?: ArgumentCollectorResult): Promise<Message | Message[]> {
        let member = this.client.guilds.resolve(process.env.GUILD_ID).member(message.author)
        if (!member)
            return message.say('> Please join the EECS Discord server before using any commands.')

        if (this.dmOnly && message.channel.type != 'dm') {
            return message.say('> You can only use this command in a DM.')
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
    async execute(message: CommandoMessage, args: Object | string | Array<string>, fromPattern: boolean, result?: ArgumentCollectorResult): Promise<Message | Message[]> {
		throw new Error(`${this.constructor.name} doesn't have a run() method.`)
	}
}

export interface EECSCommandInfo extends CommandInfo {
    dmOnly?: boolean,
    unverifiedOnly?: boolean,
    adminOnly?: boolean,
    hidden?: boolean
}