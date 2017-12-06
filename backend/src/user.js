class User {
  constructor(socket) {
    this.connection = socket;
    this.position = {
      x: Math.floor(Math.random() * 80),
      y: Math.floor(Math.random() * 80)
    };

    this.id = socket.id;
    this.isVisible = true;

    this.color = COLOR_OPTIONS[Math.floor(Math.random() * COLOR_OPTIONS.length)];
  }

  getState() {
    return {
      id: this.id,
      position: this.isVisible ? this.position : null,
      color: this.color
    };
  }
}

const COLOR_OPTIONS = [
  '#C91F37',
  '#F47983',
  '#875F9A',
  '#BF55EC',
  '#22A7F0',
  '#1F4788',
  '#006442',
  '#36D7B7',
  '#F5D76E',
  '#BFBFBF',
  '#EEEEEE'
];

module.exports = User;
