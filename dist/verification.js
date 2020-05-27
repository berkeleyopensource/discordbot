"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCode = exports.verifyCode = void 0;
const nodemailer = require("nodemailer");
let codes = {};
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});
function verifyCode(user, code) {
    if (codes[user.id] == code) {
        delete codes[user.id];
        return true;
    }
    return false;
}
exports.verifyCode = verifyCode;
/**
 * Generates, stores, and sends a verification code to the email
 *
 * @returns whether the send was successful
 */
function sendCode(user, email) {
    let code = new Date().getTime() % 1000000;
    code = code < 1000000 ? code + 1000000 : code;
    try {
        // transporter.sendMail({
        //     from: process.env.EMAIL_USER,
        //     to: email,
        //     subject: 'EECS Discord Verification Code',
        //     text: `Please use the code ${code} to complete your verification.\nThis code will expire in five minutes.`
        // })
        console.log(code);
        codes[user.id] = code;
        setTimeout(() => {
            if (codes[user.id] == code) {
                delete codes[user.id];
                console.log(`User ${user.tag} deleted from queue`);
            }
        }, 5 * 60 * 1000);
        console.log(`Code successfully sent to ${email} for user ${user.tag}`);
        return true;
    }
    catch (error) {
        console.log(`Code failed to send to ${email} for user ${user.tag}`);
        return false;
    }
}
exports.sendCode = sendCode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3ZlcmlmaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5Q0FBd0M7QUFHeEMsSUFBSSxLQUFLLEdBQThCLEVBQUUsQ0FBQTtBQUV6QyxNQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsZUFBZSxDQUFDO0lBQzNDLE9BQU8sRUFBRSxPQUFPO0lBQ2hCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVU7UUFDNUIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVTtLQUMvQjtDQUNKLENBQUMsQ0FBQTtBQUVGLFNBQWdCLFVBQVUsQ0FBQyxJQUFVLEVBQUUsSUFBWTtJQUMvQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxFQUFFO1FBQ3hCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNyQixPQUFPLElBQUksQ0FBQTtLQUNkO0lBQ0QsT0FBTyxLQUFLLENBQUE7QUFDaEIsQ0FBQztBQU5ELGdDQU1DO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLFFBQVEsQ0FBQyxJQUFVLEVBQUUsS0FBYTtJQUM5QyxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQTtJQUN6QyxJQUFJLEdBQUcsSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO0lBRTdDLElBQUk7UUFDQSx5QkFBeUI7UUFDekIsb0NBQW9DO1FBQ3BDLGlCQUFpQjtRQUNqQixpREFBaUQ7UUFDakQsaUhBQWlIO1FBQ2pILEtBQUs7UUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2pCLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFBO1FBQ3JCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxFQUFFO2dCQUN4QixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7Z0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLENBQUMsR0FBRyxxQkFBcUIsQ0FBQyxDQUFBO2FBQ3JEO1FBQ0wsQ0FBQyxFQUFFLENBQUMsR0FBQyxFQUFFLEdBQUMsSUFBSSxDQUFDLENBQUE7UUFFYixPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixLQUFLLGFBQWEsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUE7UUFFdEUsT0FBTyxJQUFJLENBQUE7S0FDZDtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsS0FBSyxhQUFhLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO1FBQ25FLE9BQU8sS0FBSyxDQUFBO0tBQ2Y7QUFDTCxDQUFDO0FBM0JELDRCQTJCQyJ9