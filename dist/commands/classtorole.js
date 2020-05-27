"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassToRoleCommand = void 0;
const EECSCommand_1 = require("../EECSCommand");
class ClassToRoleCommand extends EECSCommand_1.default {
    constructor(client) {
        super(client, {
            name: 'classtorole',
            group: 'util',
            memberName: 'classtorole',
            description: 'temporary command',
            hidden: true,
            adminOnly: true
        });
    }
    execute(message) {
        // TODO: y'all, i have no idea what the original code was supposed to do. i'll leave this to you guys :P
        return new Promise(() => { });
    }
}
exports.ClassToRoleCommand = ClassToRoleCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3N0b3JvbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvY2xhc3N0b3JvbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZ0RBQXdDO0FBR3hDLE1BQWEsa0JBQW1CLFNBQVEscUJBQVc7SUFDL0MsWUFBWSxNQUFzQjtRQUM5QixLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ1YsSUFBSSxFQUFFLGFBQWE7WUFDbkIsS0FBSyxFQUFFLE1BQU07WUFDYixVQUFVLEVBQUUsYUFBYTtZQUN6QixXQUFXLEVBQUUsbUJBQW1CO1lBQ2hDLE1BQU0sRUFBRSxJQUFJO1lBQ1osU0FBUyxFQUFFLElBQUk7U0FDbEIsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELE9BQU8sQ0FBQyxPQUF3QjtRQUM1Qix3R0FBd0c7UUFDeEcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUMsQ0FBQTtJQUNoQyxDQUFDO0NBQ0o7QUFoQkQsZ0RBZ0JDIn0=