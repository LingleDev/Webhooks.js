declare module "webhooks.js" {
    export class Webhook {
        constructor(options: WebhookOptions);

        send(data: string|object|RichEmbed): Promise<WebhookResponse>;
    }

    export class RichEmbed {
        constructor();

        public body: EmbedBody;

        pack(): EmbedBody;

        setTitle(title: string): this;
        setDescription(desc: string): this;
        setTimestamp(): this;
        setColor(color: number): this;
        addField(name: string, value: string, inline: boolean): this;
        setImage(url: string): this;
        setThumbnail(url: string): this;
        setURL(url: string): this;
        setFooter(text: string, icon_url: string): this;
        setAuthor(name: string, url: string, icon: string): this;
    }

    interface WebhookResponse {
        id: string;
        type: number;
        content: string;
        channel_id: string;
        author: MessageAuthor;
        attachments: Array<Object>;
        embeds: Array<EmbedBody>;
        mentions: Array<Object>;
        mention_roles: Array<Object>;
        pinned: boolean;
        mention_everyone: boolean;
        tts: boolean;
        timestamp: string;
        edited_timestamp?: number|null;
        flags: number;
        webhook_id: string;
    }

    interface MessageAuthor {
        bot: boolean;
        id: string;
        username: string;
        avatar: string;
        discriminator: string;
    }

    interface WebhookOptions {
        id: string;
        token: string;
    }

    interface EmbedBody {
        title: string;
        type: string;
        description: string;
        url: string;
        timestamp: string;
        color: number;
        footer: EmbedFooter;
        image: string;
        thumbnail: string;
        video: EmbedVideo;
        author: EmbedAuthor;
        fields: Array<EmbedField>;
    }

    interface EmbedField {
        name: string;
        value: string;
        inline?: boolean;
    }

    interface EmbedAuthor {
        name: string;
        url: string;
        icon_url: string;
    }

    interface EmbedVideo {
        url: string;
        height: number;
        width: number;
    }

    interface EmbedImage {
        url: string;
        height: number;
        width: number;
    }

    interface EmbedThumbnail {
        url: string;
        height: number;
        width: number;
    }

    interface EmbedFooter {
        text: string;
        icon_url: string;
    }
}