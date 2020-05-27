import nodemailer from 'nodemailer'

let codes = {}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
})

/**
 * @param {Discord.User} user
 * @param {number} code
 */
export function verifyCode(user, code) {
    if (codes[user.id] == code) {
        delete codes[user.id]
        return true
    }
    return false
}

/**
 * Generates, stores, and sends a verification code to the email
 * 
 * @param {Discord.User} user 
 * @param {string} email the email address to send the code to
 * @returns whether the send was successful
 */
export function sendCode(user, email): boolean {
    const code = new Date().getTime() % 1000000
    code = code < 1000000 ? code + 1000000 : code

    try {
        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'EECS Discord Verification Code',
            text: `Please use the code ${code} to complete your verification.\nThis code will expire in five minutes.`
        })
        codes[user.id] = code
        setTimeout(() => {
            if (codes[user.id] == code) {
                delete codes[user.id]
                console.log(`User ${message.author.tag} deleted from queue`)
            }
        }, 5*60*1000)

        console.log(`Code successfully sent to ${email} for user ${user.tag}`)

        return true
    } catch (error) {
        console.log(`Code failed to send to ${email} for user ${user.tag}`)
        return false
    }
}