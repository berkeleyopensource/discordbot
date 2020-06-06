import EECSCommand from '../EECSCommand'
import { CommandoClient, CommandoMessage } from 'discord.js-commando'
import { MessageEmbed } from 'discord.js'

export class CourseCommand extends EECSCommand {
    private catalog: { [key: string]: { [key: string]: number } } = null
    private readonly laymanToAbbreviation: { [key: string]: string } = {
        "ASTRO": "ASTRON",
        "CS": "COMPSCI",
        "MCB": "MCELLBI",
        "NUTRISCI": "NUSCTX",
        "BIOE": "BIO ENG",
        "BIO E": "BIO ENG",
        "BIO P": "BIO PHY",
        "BIOENG": "BIO ENG",
        "BIO": "BIOLOGY",
        "CIVE": "CIV ENG",
        "CIV E": "CIV ENG",
        "CHEME": "CHM ENG",
        "CHEM E": "CHM ENG",
        "CHMENG": "CHM ENG",
        "CIVENG": "CIV ENG",
        "CLASSICS": "CLASSIC",
        "COGSCI": "COG SCI",
        "COLLEGE WRITING": "COLWRIT",
        "COMPLIT": "COM LIT",
        "COMLIT": "COM LIT",
        "CYPLAN": "CY PLAN",
        "CP" : "CY PLAN",
        "DESINV": "DES INV",
        "DESIGN" : "DES INV",
        "DEVENG": "DEV ENG",
        "DEVSTD": "DEV STD",
        "DS" : "DATASCI",
        "EALANG": "EA LANG",
        "ED": "ENV DES",
        "EE": "EL ENG",
        "ERG": "ENE,RES",
        "ER": "ENE,RES",
        "ENERES": "ENE,RES",
        "E": "ENGIN",
        "ENGINEERING": "ENGIN",
        "ENVSCI": "ENV SCI",
        "ETHSTD": "ETH STD",
        "EURAST": "EURA ST",
        "GEOLOGY": "GEOG",
        "HINURD": "HIN-URD",
        "HUMBIO": "HUM BIO",
        "IB": "INTEGBI",
        "IE": "IND ENG",
        "IEOR": "IND ENG",
        "LING": "LINGUIS",
        "L&S": "L & S",
        "LS": "L & S",
        "MALAYI": "MALAY/I",
        "MATSCI": "MAT SCI",
        "MS": "MAT SCI",
        "MSE": "MAT SCI",
        "MECENG": "MEC ENG",
        "MECHE": "MEC ENG",
        "MECH E": "MEC ENG",
        "ME": "MEC ENG",
        "MEDST": "MED ST",
        "MESTU": "M E STU",
        "MIDDLE EASTERN STUDIES": "M E STU",
        "MILAFF": "MIL AFF",
        "MILSCI": "MIL SCI",
        "NEUROSCI": "NEUROSC",
        "NE": "NUC ENG",
        "NESTUD": "NE STUD",
        "MEDIA": "MEDIAST",
        "PE": "PHYS ED",
        "PHYSED": "PHYS ED",
        "PHILO": "PHILOS",
        "PHIL": "PHILOS",
        "POLI ECON" : "POLECON",
        "POLIECON" : "POLECON",
        "PHILOSOPHY": "PHILO",
        "PMB": "PLANTBI",
        "POLI": "POL SCI",
        "POLSCI": "POL SCI",
        "POLISCI": "POL SCI",
        "POLI SCI": "POL SCI",
        "PS" : "POL SCI",
        "PUBPOL": "PUB POL",
        "PP": "PUB POL",
        "PUBLIC POLICY": "PUB POL",
        "PUBAFF": "PUB AFF",
        "PSYCHOLOGY": "PSYCH",
        "SASIAN": "S ASIAN",
        "SSEASN": "S,SEASN",
        "STATS": "STAT",
        "TDPS": "THEATER",
        "HAAS": "UGBA",
        "VIETNAMESE": "VIETNMS",
        "VISSCI": "VIS SCI",
        "VISSTD": "VIS STD",
    }
      
    constructor(client: CommandoClient) {
        super(client, {
            name: 'course',
            group: 'util',
            memberName: 'course',
            description: 'Info about a Berkeley class',
            throttleTime: 3,
            aliases: ['class', 'c']
        })

        this.getCatalog()
        setInterval(this.getCatalog, 24*60*60*1000 /* milliseconds to days */)
    }

    getCatalog() {
        return fetch('https://www.berkeleytime.com/api/catalog/catalog_json/')
            .then(response => response.json())
            .then(data =>  {
                let newCatalog: { [key: string]: { [key: string]: number } } = {}
                for (const course of data['courses']) {
                    if (!(course['abbreviation'] in newCatalog)) 
                        newCatalog[course['abbreviation']] = {}
                    
                    newCatalog[course['abbreviation']][course['course_number']] = course['id']
                }

                if (!this.catalog)
                    console.log('Course catalog initialized!')

                this.catalog = newCatalog
            })
    }

    async execute(message: CommandoMessage, args: string) {
        if (args == 'refresh') {
            await this.getCatalog()
            return message.say('Catalog successfully updated. Go bears!')
        }

        const search = args.trim().toUpperCase()
        let layman = false, longestAbbrev = ''

        for (const abbrev in this.catalog) {
            if (abbrev.length > longestAbbrev.length && search.startsWith(abbrev))
                longestAbbrev = abbrev
        }
        for (const abbrev in this.laymanToAbbreviation) {
            if (abbrev.length > longestAbbrev.length && search.startsWith(abbrev)) {
                longestAbbrev = abbrev
                layman = true
            }
        }

        if (!longestAbbrev)
            return message.say(`Course \`${args}\` not found`)
        
        const courseNum = search.substring(longestAbbrev.length).trim()
        longestAbbrev = layman ? this.laymanToAbbreviation[longestAbbrev] : longestAbbrev

        if (courseNum in this.catalog[longestAbbrev]) {
            const response = await fetch(`https://www.berkeleytime.com/api/catalog/catalog_json/course_box/?course_id=${this.catalog[longestAbbrev][courseNum]}`)
            const data = await response.json()

            let description = 'No description.'
            if (data['course']['description']) {
                description = data['course']['description']
                if (description.length > 256)
                    description = description.substring(0, 256-3) + '...'
            }

            const abbrev = data['course']['abbreviation']
            return message.say(new MessageEmbed({
                title: `${abbrev} ${courseNum}`,
                description: data['course']['title'],
                url: `https://www.berkeleytime.com/catalog/${abbrev}/${courseNum}/`.replace(' ', '%20'),
                color: 0x003262,
                thumbnail: {
                    url: 'https://brand.berkeley.edu/wp-content/uploads/2016/10/ucbseal_139_540.png'
                },
                footer: {
                    text: 'BerkeleyTime.com',
                    iconURL: 'https://www.berkeleytime.com/favicon.png'
                },
                fields: [
                    {
                        name: 'Description',
                        inline: false,
                        value: description
                    },
                    {
                        name: 'Units',
                        inline: true,
                        value: data['course']['units'] || 'Unknown'
                    },
                    {
                        name: 'Average Grade',
                        inline: true,
                        value: data['course']['letter_average'] || 'Unknown'
                    },
                    {
                        name: 'Enrolled',
                        inline: true,
                        value: data["course"]["enrolled_percentage"] ? `${Math.round(data["course"]["enrolled_percentage"] * 100)}%` : 'Unknown'
                    }
                ]
            }))
        } else {
            return message.say(`Course \`${args}\` not found`)
        }
    }
}