const blessed = require("blessed");
const screen = blessed.screen();

const ClientUI = require("./ui/client");

const ui = new ClientUI(screen);

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// Render the screen.
screen.render();