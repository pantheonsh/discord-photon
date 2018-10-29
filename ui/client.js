const blessed = require("blessed");

var chunkStr = function(str, chunkLength) {
    return str.match(new RegExp('[\\s\\S]{1,' + +chunkLength + '}', 'g'));
}

class ClientUI {
    /**
     * The login window.
     * @param {blessed.Widgets.Screen} screen 
     */
    constructor(screen) {
        this.screen = screen;

        const guild_box = blessed.box({
            left: 0,
            top: 0,
            width: 8,
            padding: 1,
            height: "100%",
            style: {
                bg: "#161616"
            },
            scrollable: true
        });

        const channel_box = blessed.box({
            left: 8,
            top: 0,
            width: 24,
            height: "100%",
            padding: 2,
            style: {
                bg: "#202020"
            },
            scrollable: true
        });

        const top_bar = blessed.box({
            left: 33,
            top: 0,
            width: "100%-33",
            height: 10,
            style: {
                fg: "#ffffff",
                bg: "#202020"
            }
        });

        const top_bar_channel_name = blessed.text({
            left: 2,
            top: 1,
            content: "#general",
            style: {
                bg: "#202020"
            }
        });

        const chat = blessed.box({
            left: 33,
            top: 3,
            width: "100%-33",
            height: "100%-10",
            padding: 1,
            style: {
                bg: "#000000",
                fg: "#ffffff"
            },
            scrollable: true
        });

        const input_box = blessed.textbox({
            left: 33,
            bottom: 2,
            height: 3,
            padding: 1,
            width: "100%-33",
            style: {
                fg: "#ffffff",
                bg: "#242424"
            }
        });

        const status_text = blessed.text({
            left: 33,
            bottom: 1,
            height: 1,
            content: "Maniaco#0231 and God#0123 are typing...",
            style: {
                fg: "#ffffff"
            }
        });

        const user_text = blessed.text({
            left: 10,
            bottom: 1,
            height: 1,
            content: "Example#0123",
            style: {
                fg: "#cccc",
                bg: "#202020"
            }
        });

        const ver_text = blessed.text({
            right: 1,
            bottom: 0,
            height: 1,
            content: "DiscordPhoton v0 github.com/pantheonsh",
            style: {
                fg: "#cccc"
            }
        });

        screen.append(guild_box);
        screen.append(channel_box);
        screen.append(top_bar);
        screen.append(chat);
        screen.append(input_box);
        screen.append(status_text);
        screen.append(user_text);
        screen.append(ver_text);
        top_bar.append(top_bar_channel_name);
        input_box.setValue("Chat in #general...");

        this.components = { guild_box, channel_box, top_bar, chat, input_box, status_text, user_text, ver_text, top_bar_channel_name }

        this.redraw();
    }

    updateGuildList({ guilds: [] }) {
        this.redraw();
    }

    updateChannelList({ channels: [] }) {
        this.redraw();
    }

    setGuild({ guild_id }) {
        this.redraw();
    }

    setChannel({ channel_id }) {
        this.redraw();
    }

    addMessageToChat({ author, id, channelid, content, date }) {
        const children = this.components.chat.children.map(ch => ch.position.height);
        const y = children.reduce((a, b) => a + b, 0);

        const computedWidth = this.components.chat.width - 16;
        const forced_linebreaks = chunkStr(content, computedWidth).length;
        const linebreaks = forced_linebreaks + content.split("\n").length;

        const wrapper = blessed.box({
            width: "100%",
            top: y,
            height: linebreaks + 1
        });

        const msg_author = blessed.text({
            content: author.substring(0, 16),
            top: 0,
            height: 1,
            style: {
                fg: "#ffffff"
            }
        });
        const msg_date = blessed.text({
            content: "15:17",
            top: 1,
            height: 1,
            style: {
                fg: "gray"
            }
        });
        const msg_content = blessed.box({
            content,
            top: 0,
            left: 16,
            height: linebreaks,
            style: {
                fg: "gray"
            }
        });

        this.components.chat.append(wrapper);
        wrapper.append(msg_author);
        wrapper.append(msg_date);
        wrapper.append(msg_content);

        this.redraw();
    }

    redraw() {
        this.screen.draw();
    }
}

module.exports = ClientUI;