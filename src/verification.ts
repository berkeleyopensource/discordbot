import * as dotenv from 'dotenv'
import * as nodemailer from 'nodemailer'
import { User } from 'discord.js'
import * as Sequelize from 'sequelize'
import * as crypto from 'crypto'

dotenv.config()

let codes: { [key: string]: [number, string] } = {}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASS || '',
    },
})

const seq = new Sequelize.Sequelize('database', 'user', null, {
    dialect: 'sqlite',
    storage: './data.sqlite',
    logging: false,
    define: {
        timestamps: false,
        freezeTableName: true,
    },
})

const db: any = seq.define('verification', {
    hash: Sequelize.TEXT,
    user_tag: Sequelize.TEXT,
    time_epoch_ms: Sequelize.INTEGER,
})
db.removeAttribute('id')

db.sync().then(console.log('Database synced!'))

/**
 * Generates, stores, and sends a verification code to the email
 * @returns whether the send was successful
 */
export async function sendCode(user: User, email: string): Promise<boolean> {
    let code = new Date().getTime() % 1000000
    code = code < 1000000 ? code + 1000000 : code

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'EECS Discord Verification Code',
            text: `Please use the code ${code} to complete your verification.\nThis code will expire in five minutes.`,
        })
        console.log(`Code successfully sent for ${user.tag}`)
        const md5 = crypto.createHash('md5')
        const hashed = md5.update(process.env.PEPPER + email).digest('hex')
        codes[user.id] = [code, hashed]
        setTimeout(() => {
            if (codes[user.id][0] == code) {
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
    if (codes[user.id][0] == code) {
        try {
            const timestamp = Date.now()
            await db.create({
                hash: codes[user.id][1],
                user_tag: user.tag,
                time_epoch_ms: timestamp,
            })
            console.log(`[${codes[user.id][1].substring(0, 6)}..., ${user.tag}, ${timestamp}] added to database`)
        } catch (error) {
            console.log('\x1b[31m%s\x1b[0m', `Error updating database for ${user.tag}`)
            console.log(error)
        }
        delete codes[user.id]
        return true
    }
    return false
}

/**
 * Queries for alts using an email
 * Limited to 10 due to 1024 character limit of Discord Embeds
 */
export async function queryEmail(args: string) {
    const md5 = crypto.createHash('md5')
    const rehash = md5.update(process.env.PEPPER + args).digest('hex')
    return await db.findAll({
        where: {
            hash: rehash,
        },
        order: [['time_epoch_ms', 'DESC']],
        limit: 10,
        raw: true,
    })
}

/**
 * Queries for alts using a user tag
 * Limited to 10 due to 1024 character limit of Discord Embeds
 */
export async function queryUserTag(args: string) {
    const hashquery = await db.findOne({ where: { user_tag: args }, order: [['time_epoch_ms', 'DESC']], raw: true })
    if (hashquery) {
        return await db.findAll({
            where: { hash: hashquery.hash },
            order: [['time_epoch_ms', 'DESC']],
            limit: 10,
            raw: true,
        })
    }
    return []
}
