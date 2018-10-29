const blessed = require("blessed");

class ClientUI {
    /**
     * The login window.
     * @param {blessed.Widgets.Screen} screen 
     */
    constructor(screen) {
        this.screen = screen;

        this.guild_box = blessed.box({
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

        this.channel_box = blessed.box({
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

        this.top_bar = blessed.box({
            left: 33,
            top: 0,
            width: "100%-33",
            height: 10,
            style: {
                fg: "#ffffff",
                bg: "#202020"
            }
        });

        this.top_bar_channel_name = blessed.text({
            left: 2,
            top: 1,
            content: "#general",
            style: {
                bg: "#202020"
            }
        });

        this.chat = blessed.box({
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

        this.input_box = blessed.textbox({
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

        this.status_text = blessed.text({
            left: 33,
            bottom: 1,
            height: 1,
            content: "Maniaco#0231 and God#0123 are typing...",
            style: {
                fg: "#ffffff"
            }
        });

        this.user_text = blessed.text({
            left: 10,
            bottom: 1,
            height: 1,
            content: "Example#0123",
            style: {
                fg: "#cccc",
                bg: "#202020"
            }
        });

        this.ver_text = blessed.text({
            right: 1,
            bottom: 0,
            height: 1,
            content: "DiscordPhoton v0 github.com/pantheonsh",
            style: {
                fg: "#cccc"
            }
        });

        screen.append(this.guild_box);
        screen.append(this.channel_box);
        screen.append(this.top_bar);
        screen.append(this.chat);
        screen.append(this.input_box);
        screen.append(this.status_text);
        screen.append(this.user_text);
        screen.append(this.ver_text);

        this.top_bar.append(this.top_bar_channel_name);

        this.input_box.setValue("Chat in #general...");

        this.input_box.focus();
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
        this.redraw();
    }

    redraw() {
        this.screen.draw();
    }
}

module.exports = ClientUI;