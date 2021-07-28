import * as crypto from 'crypto'
import * as dotenv from 'dotenv'
import * as nodemailer from 'nodemailer'
import { User } from 'discord.js'
import { verificationDB } from './sequelizeDB'

dotenv.config()

let codes: { [key: string]: [number, string] } = {}

let transporter: nodemailer.Transporter

export async function initializeNodemailer() {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER || '',
            pass: process.env.EMAIL_PASS || '',
        },
    })

    await new Promise((resolve, reject) => {
        transporter.verify(error => {
            if (error) {
                console.log(error)
                return reject(error)
            } else {
                console.log('Successfully connected email!')
                resolve(true)
            }
        })
    })
}

/**
 * Generates, stores, and sends a verification code to the email
 * @returns whether the send was successful
 */
export async function sendCode(user: User, email: string): Promise<boolean> {
    let code = Math.floor(Math.random() * 1000000)
    const query = await queryEmail(email)
    if (query.length) {
        return false
    }
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'EECS Discord Verification Code',
            text: `Please use the code ${code} to complete your verification.\nThis code will expire in five minutes.`,
        })
        console.log(`Code successfully sent for ${user.tag}`)

        const sha = crypto.createHash('sha256')
        const hashed = sha.update(process.env.PEPPER + email).digest('hex')
        codes[user.id] = [code, hashed]
        setTimeout(() => {
            if (codes[user.id] && codes[user.id][0] == code) {
                delete codes[user.id]
                console.log(`User ${user.tag} deleted from queue`)
            }
        }, 5 * 60 * 1000)
        return true
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `Code failed to send to ${user.tag}`)
        return false
    }
}

/**
 * Verifies provided code with stored code
 * @returns whether the code verification was successful
 */
export async function verifyCode(user: User, code: number) {
    if (codes[user.id] && codes[user.id][0] == code) {
        try {
            const timestamp = Date.now()
            await verificationDB.create({
                hash: codes[user.id][1],
                verify_timestamp: timestamp,
            })
            console.log(`[${codes[user.id][1].substring(0, 6)}..., ${timestamp}] for ${user.tag} added to database`)
        } catch (error) {
            console.log('\x1b[31m%s\x1b[0m', `Error updating database for ${user.tag}`)
            console.log(error)
        }
        delete codes[user.id]
        return true
    }
    return false
}

async function queryEmail(args: string) {
    const sha = crypto.createHash('sha256')
    const rehash = sha.update(process.env.PEPPER + args).digest('hex')
    return await verificationDB.findAll({
        where: {
            hash: rehash,
        },
        order: [['verify_timestamp', 'DESC']],
        limit: 10,
        raw: true,
    })
}
