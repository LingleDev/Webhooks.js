const fetch = require('node-fetch')
const RichEmbed = require('./RichEmbed')
const EventEmitter = require('events').EventEmitter

/**
* Represents a Discord webhook
* @param {Object} options 
* @param {String} options.id
* @param {String} options.token
*/
class Webhook extends EventEmitter {
    constructor(options) {
        super()

        if (!options.id) throw new Error(`Please provide a webhook ID.`)
        if (!options.token) throw new Error(`Please provide a webhook token.`)

        this.id = options.id
        this.token = options.token
    }

    async send(options) {
        const body = {
            content: "",
            embeds: [],
            username: "",
            avatar_url: "",
            tts: false,
        }

        if (typeof options == "string") body.content = options;
        if (typeof options == "object" && options instanceof RichEmbed) body.embeds.push(options.pack());

        const r = await fetch(`https://discord.com/api/webhooks/${this.id}/${this.token}?wait=true`, {
            method : "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const json = await r.json()

        if (typeof json.code !== 'undefined') return this.emit('error', { code: json.code, message: json.message })

        if (typeof json.code === 'undefined') {
            this.emit('done', {
                json
            })
        }

    }
}

module.exports = Webhook