class RichEmbed {
    constructor() {
        this.body = {
            title: "",
            description: "",
            fields: [],
            url: "",
            color: null,
            footer : {
                text: "",
                icon_url: ""
            },
            image: "",
            thumbnail: "",
            author: {
                name: "",
                url: "",
                icon_url: ""
            },

            timestamp: null
        }
    }

    pack() {
        return this.body
    }

    setTitle(title) {
        this.body.title = title
        
        return this;
    }

    setDescription(desc) {
        this.body.description = desc
        
        return this;
    }

    addField(name, value, inline) {
        this.body.fields.push({
            name: name || undefined,
            value: value || undefined,
            inline: inline
        })

        return this;
    }

    setImage(url) {
        this.body.image = url

        return this;
    }

    setThumbnail(url) {
        this.body.thumbnail = url;

        return this;
    }

    setColor(color) {
        this.body.color = color

        return this;
    }

    setURL(url) {
        this.body.url = url

        return this;
    }

    setFooter(text, icon) {
        this.body.footer.text = {
            text: text,
            icon_url: icon
        }

        return this;
    }

    setAuthor(name, url, icon) {
        this.body.author = {
            name: name,
            url: url,
            icon_url: icon
        }

        return this
    }

    setTimestamp(stamp) {
        if (!stamp) stamp = Date.now()

        this.body.timestamp = stamp;

        return this;
    }
}

module.exports = RichEmbed