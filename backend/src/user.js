const MOVE_DISTANCE = 2;
const MAX_DIMENSION = 100;
const TIMEOUT_MS = 1000;

class User {
  constructor(socket) {
    this.connection = socket;
    this.id = socket.id;
  }

  onGameStart() {
    this.position = {
      x: Math.floor(Math.random() * MAX_DIMENSION * .8),
      y: Math.floor(Math.random() * MAX_DIMENSION * .8)
    };

    this.resetTimer();
  }

  setColor(color) {
    this.color = color;
  }

  resetTimer() {
    this.lastPingTime = Date.now();
  }

  isInactive() {
    return Date.now() - this.lastPingTime > TIMEOUT_MS;
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

  reset() {
    this.color = null;
    this.position = null;
    this.lastPingTime = null;
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
      position: this.position,
      color: this.color
    };
  }
}

module.exports = User;
