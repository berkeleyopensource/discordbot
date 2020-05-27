"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollCommand = void 0;
const EECSCommand_1 = require("../EECSCommand");
const discord_js_1 = require("discord.js");
class PollCommand extends EECSCommand_1.default {
    constructor(client) {
        super(client, {
            name: 'poll',
            group: 'util',
            memberName: 'poll',
            description: 'starts a poll',
            throttling: {
                usages: 1,
                duration: 10
            },
            examples: [
                'poll {which is the superior cs?} {EECS} {LSCS} {cogsci} {cool socks}'
            ]
        });
        this.emojis = ['0⃣', '1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣'];
    }
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            // i did not bother to look through this code and clean it up other than small things but it seems to work
            const pollItems = args.split(/\s+(?={)/);
            if (pollItems.length < 2)
                return message.say('> Please provide at least a question and one poll option');
            const question = pollItems.shift().slice(1, -1);
            if (pollItems.length > 10) {
                yield message.say(`> Your input: \`${message.content}\``);
                return message.say('Poll value limit is 10');
            }
            let contents = '';
            for (let i = 0; i < pollItems.length; i++) {
                contents += `${this.emojis[i]} - \`${pollItems[i].slice(1, -1)}\`\n`;
            }
            let embed = new discord_js_1.MessageEmbed({
                title: `\`${question}\``,
                description: contents,
                color: 0xfdb515,
            }).setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }));
            if (!/\{|}/.test(message.content)) {
                message.delete();
                yield message.say('> Items for `>poll` should be in curly brackets {}');
                yield message.say('> Example: `>poll {Beep?} {Beep} {Boop}`');
                return message.say(`> Your input: \`${message.content}\``);
            }
            yield message.say(embed);
            yield message.say(`> Your input: \`${message.content}\``);
            const confirmMessage = yield message.say('> Does this look good?');
            yield confirmMessage.react('👍');
            yield confirmMessage.react('👎');
            confirmMessage
                .awaitReactions((reaction, user) => user.id === message.author.id && (reaction.emoji.name === '👍' || reaction.emoji.name === '👎'), { max: 1, time: 10000 })
                .then((collection) => __awaiter(this, void 0, void 0, function* () {
                if (collection.first().emoji.name === '👍') {
                    const sentPoll = yield message.channel.send(embed);
                    for (let i = 0; i < pollItems.length; i++) {
                        sentPoll.react(`${this.emojis[i]}`);
                    }
                    confirmMessage.delete();
                }
                else {
                    confirmMessage.delete();
                    return message.say('> Poll creation cancelled.');
                }
            }))
                .catch(() => {
                confirmMessage.delete();
                return message.say('> No response, poll creation cancelled.');
            });
        });
    }
}
exports.PollCommand = PollCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9sbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9wb2xsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGdEQUF3QztBQUN4QywyQ0FBa0Q7QUFHbEQsTUFBYSxXQUFZLFNBQVEscUJBQVc7SUFFeEMsWUFBWSxNQUFzQjtRQUM5QixLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ1YsSUFBSSxFQUFFLE1BQU07WUFDWixLQUFLLEVBQUUsTUFBTTtZQUNiLFVBQVUsRUFBRSxNQUFNO1lBQ2xCLFdBQVcsRUFBRSxlQUFlO1lBQzVCLFVBQVUsRUFBRTtnQkFDUixNQUFNLEVBQUUsQ0FBQztnQkFDVCxRQUFRLEVBQUUsRUFBRTthQUNmO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLHNFQUFzRTthQUN6RTtTQUNKLENBQUMsQ0FBQTtRQWRXLFdBQU0sR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBZXRGLENBQUM7SUFFSyxPQUFPLENBQUMsT0FBd0IsRUFBRSxJQUFZOztZQUNoRCwwR0FBMEc7WUFDMUcsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQTtZQUN4QyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztnQkFDcEIsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLDBEQUEwRCxDQUFDLENBQUE7WUFFbEYsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUMvQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxFQUFFO2dCQUN2QixNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLE9B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