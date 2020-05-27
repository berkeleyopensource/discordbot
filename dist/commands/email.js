"use strict";
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
            args: [
                {
                    key: 'email',
                    prompt: '> Please enter a valid Berkeley email',
                    type: 'string'
                }
            ],
            hidden: true,
            throttling: {
                usages: 1,
                duration: 15
            },
            dmOnly: true,
            unverifiedOnly: true
        });
        this.regex = /^[A-z0-9._%+-]+@berkeley\.edu$/;
    }
    execute(message, args) {
        if (!this.regex.test(args.email))
            return message.say('> Please enter a valid Berkeley email');
        let success = verification_1.sendCode(message.author, args.email);
        if (success) {
            return message.say(new discord_js_1.MessageEmbed({
                title: `Email Received`,
                description: `Verification code successfully sent to \`${args.email}\`\n\n` +
                    'Once you receive your temporary verification code, please verify using\n' +
                    `\`${process.env.PREFIX}code [verification code]\``,
                color: 0xfdb515
            }));
        }
        else {
            return message.say(`> Error sending email to \`${args.email}\``);
        }
    }
}
exports.EmailCommand = EmailCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvZW1haWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZ0RBQXdDO0FBQ3hDLGtEQUEwQztBQUMxQywyQ0FBeUM7QUFHekMsTUFBYSxZQUFhLFNBQVEscUJBQVc7SUFHekMsWUFBWSxNQUFzQjtRQUM5QixLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ1YsSUFBSSxFQUFFLE9BQU87WUFDYixLQUFLLEVBQUUsS0FBSztZQUNaLFVBQVUsRUFBRSxPQUFPO1lBQ25CLFdBQVcsRUFBRSxnQ0FBZ0M7WUFDN0MsSUFBSSxFQUFFO2dCQUNGO29CQUNJLEdBQUcsRUFBRSxPQUFPO29CQUNaLE1BQU0sRUFBRSx1Q0FBdUM7b0JBQy9DLElBQUksRUFBRSxRQUFRO2lCQUNqQjthQUNKO1lBQ0QsTUFBTSxFQUFFLElBQUk7WUFDWixVQUFVLEVBQUU7Z0JBQ1IsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsUUFBUSxFQUFFLEVBQUU7YUFDZjtZQUNELE1BQU0sRUFBRSxJQUFJO1lBQ1osY0FBYyxFQUFFLElBQUk7U0FDdkIsQ0FBQyxDQUFBO1FBdEJXLFVBQUssR0FBRyxnQ0FBZ0MsQ0FBQTtJQXVCekQsQ0FBQztJQUVELE9BQU8sQ0FBQyxPQUF3QixFQUFFLElBQXVCO1FBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQzVCLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFBO1FBRS9ELElBQUksT0FBTyxHQUFHLHVCQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDbEQsSUFBSSxPQUFPLEVBQUU7WUFDVCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSx5QkFBWSxDQUFDO2dCQUNoQyxLQUFLLEVBQUUsZ0JBQWdCO2dCQUN2QixXQUFXLEVBQUUsNENBQTRDLElBQUksQ0FBQyxLQUFLLFFBQVE7b0JBQ3ZFLDBFQUEwRTtvQkFDMUUsS0FBSyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sNEJBQTRCO2dCQUN2RCxLQUFLLEVBQUUsUUFBUTthQUNsQixDQUFDLENBQUMsQ0FBQTtTQUNOO2FBQU07WUFDSCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFBO1NBQ25FO0lBQ0wsQ0FBQztDQUNKO0FBM0NELG9DQTJDQyJ9