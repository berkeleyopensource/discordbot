import EECSCommand from '../EECSCommand'
import { client } from '../bot'
import { CommandoClient, CommandoMessage } from 'discord.js-commando'
import { Message, MessageEmbed, TextChannel } from 'discord.js'
const fields: Map<string, string> = new Map()

export class EventCommand extends EECSCommand {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'event',
            group: 'mod',
            memberName: 'event',
            description: 'mod command to post a formatted event',
            hidden: true,
            adminOnly: true,
        })
    }

    async execute(message: CommandoMessage, args: string) {
        await message.say(
            '> Make an event! You will be able to modify any field at the end.\n' +
                '> Input `cancel` at any time to stop'
        )
        const filter = (m: CommandoMessage) => m.author.tag === message.author.tag

        // prompts
        try {
            await this.prompt(message, '> Event name?', 'name', filter)
            await this.prompt(message, '> Description?', 'desc', filter)
            await this.prompt(message, '> Host?', 'host', filter)
            await this.prompt(message, '> Time?', 'time', filter)
            await this.prompt(message, '> Location?', 'loc', filter)
            await this.prompt(message, '> Image? Respond with `none` to skip', 'image', filter)
            await this.prompt(message, '> Role Mentions? Respond with `none` to skip', 'rm', filter)
        } catch (error) {
            if (typeof error === 'string') {
                return message.say('> Input was `cancel`\n> Event creation stopped!')
            } else {
                return message.say('> No response for a prompt. Event creation stopped!')
            }
        }

        // base embed
        let embed = new MessageEmbed({
            title: 'Event: ' + fields.get('name'),
            color: 0xfdb515,
            description: this.text(),
        })

        // use custom image if it exists
        if (fields.has('image')) {
            embed.setThumbnail(fields.get('image'))
        } else {
            embed.attachFiles(['icon.png']).setThumbnail('attachment://icon.png')
        }

        // catches error and defaults to icon if image is not valid
        let embedPreview: Message
        let rmMessage: Message
        try {
            embedPreview = (await message.say(embed)) as Message
            if (fields.has('rm')) {
                rmMessage = (await message.say(fields.get('rm'))) as Message
            } else {
                rmMessage = (await message.say('`No role mentions, this section will be omitted`')) as Message
            }
        } catch (error) {
            await message.say('> Image must be well formed. Defaulting to bot icon for now!')
            embed.attachFiles(['icon.png']).setThumbnail('attachment://icon.png')
            embedPreview = (await message.say(embed)) as Message
        }

        let editing = true
        // edit repl
        while (editing) {
            let sent = (await message.say(
                '> Input `name`, `desc`, `host`, `time`, `loc`, `image`, or `rm` to update a field\n' +
                    '> Input `finish` to stop editing and send the announcement!'
            )) as Message
            let collection = await message.channel.awaitMessages(filter, { max: 1, time: 30000 })
            await sent.delete()
            let response: string
            try {
                response = collection.first().content
            } catch (error) {
                return message.say('> No response for a prompt. Event creation stopped!')
            }
            if (response === 'cancel') {
                return message.say('> Input was `cancel`\n> Event creation stopped!')
            }

            // checks if response to prompt is a valid field or finish
            if (!fields.has(response) && ['image', 'rm', 'finish'].indexOf(response) === -1) {
                await message.say(`> \`${response}\` is not a valid field`)
                continue
            }

            // send event
            if (response === 'finish') {
                break
            }

            // edit prompt
            try {
                await this.prompt(
                    message,
                    `> Input new content for prompt \`${response}\`\n` + '> Input `cancel` to return to editing menu',
                    response,
                    filter
                )
                // name and image require their own methods
                if (response === 'name') {
                    embed.setTitle('Event: ' + fields.get('name'))
                }
                if (response === 'image') {
                    embed.setThumbnail(fields.get('image'))
                    embed.files = []
                }
            } catch (error) {
                if (error === 'cancel') {
                    continue
                } else {
                    return message.say('> No response for a prompt. Event creation stopped!')
                }
            }

            //updates embed contents
            embed.setDescription(this.text())
            if (fields.has('rm')) {
                rmMessage.edit(fields.get('rm'))
            } else {
                rmMessage.edit('`No role mentions, this section will be omitted`')
            }

            // updates embed preview; catches error and defaults to icon if image is not valid
            try {
                await embedPreview.edit(embed)
            } catch (error) {
                await message.say('> Image must be well formed. Defaulting to bot icon for now!')
                embed.attachFiles(['icon.png']).setThumbnail('attachment://icon.png')
                await embedPreview.edit(embed)
            }
        }

        // sends event announcement
        const ANNOUNCEMENTS_CHANNEL = client.channels.resolve(process.env.ANNOUNCEMENTS_CHANNEL_ID) as TextChannel
        let announcement = await ANNOUNCEMENTS_CHANNEL.send(embed)
        if (fields.has('rm')) {
            let mention = await ANNOUNCEMENTS_CHANNEL.send(rmMessage)
            await mention.react('☑️')
            await mention.react('🔘')
        } else {
            await announcement.react('☑️')
            await announcement.react('🔘')
        }
    }

    /**
     * accessing an empty collection returned by awaitMessages or saying "cancel" throws an error
     */
    async prompt(
        message: CommandoMessage,
        promptText: string,
        fieldName: string,
        filter: (arg0: CommandoMessage) => boolean
    ) {
        let sent = (await message.say(promptText)) as Message
        let collection = await message.channel.awaitMessages(filter, { max: 1, time: 30000 })
        await sent.delete()

        fields.set(fieldName, collection.first().content)
        if (fieldName === 'image') {
            if (collection.first().attachments.size) {
                fields.set(fieldName, collection.first().attachments.first().url)
            }
        }
        if (collection.first().content === 'none') {
            fields.delete(fieldName)
        }
        if (collection.first().content === 'cancel') {
            throw 'cancel'
        }
    }

    text() {
        return `${fields.get('desc').trim()}\n
                 __***Host:***__
                ${fields.get('host').trim()}\n
                 __***Time:***__
                ${fields.get('time').trim()}\n
                 __***Location:***__
                ${fields.get('loc').trim()}\n
                 __***Interest Check:***__\n☑️ Going\n🔘 Interested`
    }
}
