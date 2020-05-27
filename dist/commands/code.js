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
            args: [
                {
                    key: 'code',
                    prompt: '> Please enter a valid code',
                    type: 'integer'
                }
            ],
            hidden: true,
            dmOnly: true,
            unverifiedOnly: true
        });
    }
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (verification_1.verifyCode(message.author, args.code)) {
                yield this.client.guilds.resolve(process.env.GUILD_ID).member(message.author).roles.add(process.env.VERIFIED_ROLE_ID);
                return message.say(new discord_js_1.MessageEmbed({
                    title: 'Verification Successful',
                    description: `User \`${message.author.tag}\` has been verified.`,
                    color: 0xfdb515
                }));
            }
            else {
                return message.say('> Incorrect verification code');
            }
        });
    }
}
exports.CodeCommand = CodeCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9jb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGdEQUF3QztBQUN4QywyQ0FBeUM7QUFDekMsa0RBQTRDO0FBRzVDLE1BQWEsV0FBWSxTQUFRLHFCQUFXO0lBQ3hDLFlBQVksTUFBc0I7UUFDOUIsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNWLElBQUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLEtBQUs7WUFDWixVQUFVLEVBQUUsTUFBTTtZQUNsQixXQUFXLEVBQUUsK0JBQStCO1lBQzVDLElBQUksRUFBRTtnQkFDRjtvQkFDSSxHQUFHLEVBQUUsTUFBTTtvQkFDWCxNQUFNLEVBQUUsNkJBQTZCO29CQUNyQyxJQUFJLEVBQUUsU0FBUztpQkFDbEI7YUFDSjtZQUNELE1BQU0sRUFBRSxJQUFJO1lBQ1osTUFBTSxFQUFFLElBQUk7WUFDWixjQUFjLEVBQUUsSUFBSTtTQUN2QixDQUFDLENBQUE7SUFDTixDQUFDO0lBRUssT0FBTyxDQUFDLE9BQXdCLEVBQUUsSUFBc0I7O1lBQzFELElBQUkseUJBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdkMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO2dCQUVySCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSx5QkFBWSxDQUFDO29CQUNoQyxLQUFLLEVBQUUseUJBQXlCO29CQUNoQyxXQUFXLEVBQUUsVUFBVSxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsdUJBQXVCO29CQUNoRSxLQUFLLEVBQUUsUUFBUTtpQkFDbEIsQ0FBQyxDQUFDLENBQUE7YUFDTjtpQkFBTTtnQkFDSCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQTthQUN0RDtRQUNMLENBQUM7S0FBQTtDQUNKO0FBakNELGtDQWlDQyJ9