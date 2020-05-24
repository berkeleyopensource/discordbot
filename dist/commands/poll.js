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
            examples: [`\`${process.env.PREFIX}poll {which is the superior cs?} {EECS} {LSCS} {cogsci} {cool socks}\``],
            throttleTime: 10,
        });
        this.emojis = ['0⃣', '1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣'];
    }
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const pollItems = args.split(/\s+(?={)/);
            if (pollItems.length < 2) {
                return message.direct(`> Items for \`${process.env.PREFIX}poll\` should be in curly brackets {}\n` +
                    `> Example: \`${process.env.PREFIX}poll {Beep?} {Beep} {Boop}\`\n` +
                    '> Please provide at least a question and one poll option');
            }
            const question = pollItems.shift().slice(1, -1);
            if (pollItems.length > 10) {
                yield message.say(`> Your input: \`${message.content}\``);
                return message.say('Poll value limit is 10');
            }
            let contents = '';
            for (let i = 0; i < pollItems.length; i++) {
                contents += `${this.emojis[i]} - \`${pollItems[i].slice(1, -1)}\`\n`;
            }
            const embed = new discord_js_1.MessageEmbed({
                title: `\`${question}\``,
                description: contents,
                color: 0xfdb515,
            }).setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }));
            yield message.direct(embed);
            yield message.direct(`> Your input: \`${message.content}\``);
            const confirmMessage = (yield message.direct('> Does this look good?'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9sbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9wb2xsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGdEQUF3QztBQUN4QywyQ0FBa0Q7QUFHbEQsTUFBYSxXQUFZLFNBQVEscUJBQVc7SUFFeEMsWUFBWSxNQUFzQjtRQUM5QixLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ1YsSUFBSSxFQUFFLE1BQU07WUFDWixLQUFLLEVBQUUsTUFBTTtZQUNiLFVBQVUsRUFBRSxNQUFNO1lBQ2xCLFdBQVcsRUFBRSxlQUFlO1lBQzVCLFFBQVEsRUFBRSxDQUFDLEtBQUssT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLHdFQUF3RSxDQUFDO1lBQzNHLFlBQVksRUFBRSxFQUFFO1NBQ25CLENBQUMsQ0FBQTtRQVRXLFdBQU0sR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBVXRGLENBQUM7SUFFSyxPQUFPLENBQUMsT0FBd0IsRUFBRSxJQUFZOztZQUNoRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBQ3hDLElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3RCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FDakIsaUJBQWlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSx5Q0FBeUM7b0JBQ3hFLGdCQUFnQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sZ0NBQWdDO29CQUNsRSwwREFBMEQsQ0FDakUsQ0FBQTthQUNKO1lBRUQsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUMv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