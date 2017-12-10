const MOVE_DISTANCE = 2;
const MAX_DIMENSION = 100;

class User {
  constructor(socket) {
    this.connection = socket;
    this.position = {
      x: Math.floor(Math.random() * MAX_DIMENSION * .8),
      y: Math.floor(Math.random() * MAX_DIMENSION * .8)
    };

    this.id = socket.id;
    this.isVisible = true;

    this.color = COLOR_OPTIONS[Math.floor(Math.random() * COLOR_OPTIONS.length)];
  }

  onAction(action) {
    switch(action ) {
      case 'MOVE_LEFT':
        this.position.x -= MOVE_DISTANCE;
        break;

      case 'MOVE_UP':
        this.position.y -= MOVE_DISTANCE;
        break;

      case 'MOVE_RIGHT':
        this.position.x += MOVE_DISTANCE;
        break;

      case 'MOVE_DOWN':
        this.position.y += MOVE_DISTANCE;
        break;

      default:
        return;
    }

    this.snapToContainer();
  }

  snapToContainer() {
    if (this.position.x < 0) this.position.x = 0;
    if (this.position.x > MAX_DIMENSION) this.position.x = MAX_DIMENSION;
    if (this.position.y < 0) this.position.y = 0;
    if (this.position.y > MAX_DIMENSION) this.position.y = MAX_DIMENSION;
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
