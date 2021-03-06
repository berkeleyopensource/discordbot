import { ArgumentCollectorResult, Command, CommandInfo, CommandoClient, CommandoMessage } from 'discord.js-commando'
import { Message } from 'discord.js'

/**
 * The default Commando command, but with some server specific features added. Use `execute()` instead of run in commands that extend this.
 */
export default class EECSCommand extends Command {
    private dmOnly: boolean
    private unverifiedOnly: boolean
    private adminOnly: boolean
    private throttleTime: number
    private throttleMap: Map<string, number>

    constructor(client: CommandoClient, info: EECSCommandInfo) {
        super(client, info)
        this.dmOnly = info.dmOnly
        this.unverifiedOnly = info.unverifiedOnly
        this.adminOnly = info.adminOnly
        this.throttleTime = info.throttleTime
        this.throttleMap = new Map()
    }

    async run(
        message: CommandoMessage,
        args: Object | string | Array<string>,
        fromPattern: boolean,
        result?: ArgumentCollectorResult
    ): Promise<Message | Message[]> {
        console.log(
            '\x1b[36m%s\x1b[0m',
            `${message.author.tag}: (${message.channel.type}) ${process.env.PREFIX + this.name} ${
                message.channel.type != 'dm' ? args : ''
            }`
        )

        const clientGuild = this.client.guilds.resolve(process.env.GUILD_ID)
        if (!clientGuild) {
            return message.say('> You do not seem to be in the EECS Discord server')
        }

        const member = clientGuild.member(message.author)
        if (!member) {
            return message.say(
                '> You were not found in the server cache.\n' +
                    '> Please speak in or rejoin the server before using any commands.'
            )
        }

        if (this.dmOnly && message.channel.type != 'dm') {
            return message.say('> You can only use this command in a DM.')
        }

        if (this.unverifiedOnly && member.roles.cache.has(process.env.VERIFIED_ROLE_ID)) {
            return message.say(`> User \`${message.author.tag}\` is already verified.`)
        }

        if (this.adminOnly && !member.roles.cache.has(process.env.ADMIN_ROLE_ID)) {
            return message.say('> You must be a server admin to use this command.')
        }

        const now = Date.now()
        const cdTime = this.throttleTime * 1000
        if (this.throttleMap.has(message.author.id)) {
            const expirationTime = this.throttleMap.get(message.author.id) + cdTime
            if (now < expirationTime) {
                const secondsLeft = (expirationTime - now) / 1000
                return message.direct(`> Please wait ${secondsLeft.toFixed(1)} seconds before reusing \`${this.name}\``)
            }
        }
        this.throttleMap.set(message.author.id, now)
        setTimeout(() => {
            this.throttleMap.delete(message.author.id)
        }, cdTime)

        return this.execute(message, args, fromPattern, result)
    }

    /**
     * The normal `Command.run()` method but with a few custom checks
     */
    async execute(
        message: CommandoMessage,
        args: Object | string | Array<string>,
        fromPattern: boolean,
        result?: ArgumentCollectorResult
    ): Promise<Message | Message[]> {
        throw new Error(`${this.constructor.name} doesn't have a run() method.`)
    }
}

export interface EECSCommandInfo extends CommandInfo {
    dmOnly?: boolean
    unverifiedOnly?: boolean
    adminOnly?: boolean
    hidden?: boolean
    throttleTime?: number
}
