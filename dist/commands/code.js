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
exports.CodeCommand = void 0;
const EECSCommand_1 = require("../EECSCommand");
const discord_js_1 = require("discord.js");
const verification_1 = require("../verification");
class CodeCommand extends EECSCommand_1.default {
    constructor(client) {
        super(client, {
            name: 'code',
            group: 'mod',
            memberName: 'code',
            description: 'submits code for verification',
            hidden: true,
            dmOnly: true,
            unverifiedOnly: true,
        });
    }
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!args || isNaN(Number(args))) {
                return message.say('> Please enter a valid code');
            }
            if (verification_1.verifyCode(message.author, Number(args))) {
                yield this.client.guilds
                    .resolve(process.env.GUILD_ID)
                    .member(message.author)
                    .roles.add(process.env.VERIFIED_ROLE_ID);
                return message.say(new discord_js_1.MessageEmbed({
                    title: 'Verification Successful',
                    description: `User \`${message.author.tag}\` has been verified.`,
                    color: 0xfdb515,
                }));
            }
            else {
                return message.say('> Incorrect verification code');
            }
        });
    }
}
exports.CodeCommand = CodeCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9jb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGdEQUF3QztBQUN4QywyQ0FBeUM7QUFDekMsa0RBQTRDO0FBRzVDLE1BQWEsV0FBWSxTQUFRLHFCQUFXO0lBQ3hDLFlBQVksTUFBc0I7UUFDOUIsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNWLElBQUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLEtBQUs7WUFDWixVQUFVLEVBQUUsTUFBTTtZQUNsQixXQUFXLEVBQUUsK0JBQStCO1lBQzVDLE1BQU0sRUFBRSxJQUFJO1lBQ1osTUFBTSxFQUFFLElBQUk7WUFDWixjQUFjLEVBQUUsSUFBSTtTQUN2QixDQUFDLENBQUE7SUFDTixDQUFDO0lBRUssT0FBTyxDQUFDLE9BQXdCLEVBQUUsSUFBWTs7WUFDaEQsSUFBSSxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7Z0JBQzlCLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFBO2FBQ3BEO1lBQ0QsSUFBSSx5QkFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7Z0JBQzFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO3FCQUNuQixPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7cUJBQzdCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO3FCQUN0QixLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtnQkFFNUMsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUNkLElBQUkseUJBQVksQ0FBQztvQkFDYixLQUFLLEVBQUUseUJBQXlCO29CQUNoQyxXQUFXLEVBQUUsVUFBVSxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsdUJBQXVCO29CQUNoRSxLQUFLLEVBQUUsUUFBUTtpQkFDbEIsQ0FBQyxDQUNMLENBQUE7YUFDSjtpQkFBTTtnQkFDSCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQTthQUN0RDtRQUNMLENBQUM7S0FBQTtDQUNKO0FBbENELGtDQWtDQyJ9