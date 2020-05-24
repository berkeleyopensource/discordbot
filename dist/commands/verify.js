"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyCommand = void 0;
const EECSCommand_1 = require("../EECSCommand");
const discord_js_1 = require("discord.js");
class VerifyCommand extends EECSCommand_1.default {
    constructor(client) {
        super(client, {
            name: 'verify',
            group: 'mod',
            memberName: 'verify',
            description: 'instructions for verification',
            dmOnly: true,
            unverifiedOnly: true,
        });
    }
    execute(message) {
        return message.say(new discord_js_1.MessageEmbed({
            title: 'Verification',
            description: 'Please submit your Berkeley email for verification.\n' +
                'Your information will not be stored or tied to your Discord account.',
            color: 0xfdb515,
        }).addField('Instructions:', `Submit your email using\n\`${process.env.PREFIX}email [berkeley.edu email]\`\n\n`));
    }
}
exports.VerifyCommand = VerifyCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3ZlcmlmeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxnREFBd0M7QUFDeEMsMkNBQXlDO0FBR3pDLE1BQWEsYUFBYyxTQUFRLHFCQUFXO0lBQzFDLFlBQVksTUFBc0I7UUFDOUIsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNWLElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLEtBQUs7WUFDWixVQUFVLEVBQUUsUUFBUTtZQUNwQixXQUFXLEVBQUUsK0JBQStCO1lBQzVDLE1BQU0sRUFBRSxJQUFJO1lBQ1osY0FBYyxFQUFFLElBQUk7U0FDdkIsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELE9BQU8sQ0FBQyxPQUF3QjtRQUM1QixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQ2QsSUFBSSx5QkFBWSxDQUFDO1lBQ2IsS0FBSyxFQUFFLGNBQWM7WUFDckIsV0FBVyxFQUNQLHVEQUF1RDtnQkFDdkQsc0VBQXNFO1lBQzFFLEtBQUssRUFBRSxRQUFRO1NBQ2xCLENBQUMsQ0FBQyxRQUFRLENBQ1AsZUFBZSxFQUNmLDhCQUE4QixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sa0NBQWtDLENBQ3JGLENBQ0osQ0FBQTtJQUNMLENBQUM7Q0FDSjtBQTFCRCxzQ0EwQkMifQ==