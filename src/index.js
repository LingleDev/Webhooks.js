const fetch = require('node-fetch')
const RichEmbed = require('./RichEmbed')
const pack = require('../package.json')
// const EventEmitter = require('events').EventEmitter

/**
* Represents a Discord webhook
* @param {Object} options 
* @param {String} options.id
* @param {String} options.token
*/
class Webhook {
    constructor(options) {
        // super()

        if (!options.id) throw new Error(`Please provide a webhook ID.`)
        if (!options.token) throw new Error(`Please provide a webhook token.`)

        this.id = options.id
        this.token = options.token
    }

    /**
     * Sends a message to your Discord webhook.
     * @param {Object} options A Discord Webhook payload. Click [here](https://discord.com/developers/docs/resources/webhook#execute-webhook-jsonform-params) for more info. 
     * @param {String} options.username Username of the webhook displayed on Discord
     * @param {String} options.avatar_url Avatar of the webhook displayed on Discord
     * @param {String} options.content Content of the message, if any
     * @param {Array} options.embeds Array of embeds, if any
     * @param {Boolean?} options.tts Whether or not this message should be spoken aloud
     * @returns {Promise<Object|Error>}
     */
    async send(options) {

        var body = {
            content: "",
            embeds: []
        }

        body.content = options.content
        body.embeds = options.embeds || []

        if (options instanceof RichEmbed) body.embeds.push(options.pack())
        if (typeof options == "string") body.content = options

        console.log(body)

        const r = await fetch(`https://discord.com/api/webhooks/${this.id}/${this.token}?wait=true`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        if (!r.ok) return new Error(r.status)

        const json = await r.json()

        if (typeof json.code !== 'undefined') return new Error(`{code: ${json.code}, message: ${json.message}}`)
        
        if (typeof json.code == 'undefined') {
            return json
        }

    }
}

module.exports = {
    Webhook,
    RichEmbed
}