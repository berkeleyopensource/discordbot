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
exports.EmailCommand = void 0;
const EECSCommand_1 = require("../EECSCommand");
const verification_1 = require("../verification");
const discord_js_1 = require("discord.js");
class EmailCommand extends EECSCommand_1.default {
    constructor(client) {
        super(client, {
            name: 'email',
            group: 'mod',
            memberName: 'email',
            description: 'submits email for verification',
            hidden: true,
            dmOnly: true,
            unverifiedOnly: true,
            throttleTime: 15,
        });
        this.regex = /^[A-z0-9._%+-]+@berkeley\.edu$/;
    }
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.regex.test(args))
                return message.say('> Please enter a valid Berkeley email');
            const success = yield verification_1.sendCode(message.author, args);
            if (success) {
                return message.say(new discord_js_1.MessageEmbed({
                    title: `Email Received`,
                    description: `Verification code successfully sent for \`${message.author.tag}\`\n\n` +
                        'Once you receive your temporary verification code, please verify using\n' +
                        `\`${process.env.PREFIX}code [verification code]\``,
                    color: 0xfdb515,
                }));
            }
            else {
                return message.say(`> Error sending email for \`${message.author.tag}\``);
            }
        });
    }
}
exports.EmailCommand = EmailCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvZW1haWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQXdDO0FBQ3hDLGtEQUEwQztBQUMxQywyQ0FBeUM7QUFHekMsTUFBYSxZQUFhLFNBQVEscUJBQVc7SUFHekMsWUFBWSxNQUFzQjtRQUM5QixLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ1YsSUFBSSxFQUFFLE9BQU87WUFDYixLQUFLLEVBQUUsS0FBSztZQUNaLFVBQVUsRUFBRSxPQUFPO1lBQ25CLFdBQVcsRUFBRSxnQ0FBZ0M7WUFDN0MsTUFBTSxFQUFFLElBQUk7WUFDWixNQUFNLEVBQUUsSUFBSTtZQUNaLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLFlBQVksRUFBRSxFQUFFO1NBQ25CLENBQUMsQ0FBQTtRQVpXLFVBQUssR0FBRyxnQ0FBZ0MsQ0FBQTtJQWF6RCxDQUFDO0lBRUssT0FBTyxDQUFDLE9BQXdCLEVBQUUsSUFBWTs7WUFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFBRSxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLENBQUMsQ0FBQTtZQUV2RixNQUFNLE9BQU8sR0FBRyxNQUFNLHVCQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUNwRCxJQUFJLE9BQU8sRUFBRTtnQkFDVCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQ2QsSUFBSSx5QkFBWSxDQUFDO29CQUNiLEtBQUssRUFBRSxnQkFBZ0I7b0JBQ3ZCLFdBQVcsRUFDUCw2Q0FBNkMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFFBQVE7d0JBQ3ZFLDBFQUEwRTt3QkFDMUUsS0FBSyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sNEJBQTRCO29CQUN2RCxLQUFLLEVBQUUsUUFBUTtpQkFDbEIsQ0FBQyxDQUNMLENBQUE7YUFDSjtpQkFBTTtnQkFDSCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQTthQUM1RTtRQUNMLENBQUM7S0FBQTtDQUNKO0FBbkNELG9DQW1DQyJ9