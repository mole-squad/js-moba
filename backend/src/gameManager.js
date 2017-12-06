const Game = require('./game');
const User = require('./user');

class GameManager {
  constructor(io) {
    this._io = io;
    this._games = [];
    this._connectionsById = new Map();

    this._io.on('connection', (socket) => this.onNewUser(socket));
  }

  onNewUser(socket) {
    const user = new User(socket);

    this._connectionsById.set(user.id, user);

    console.log(`User Connected: #${user.id}`);

    socket.on('disconnect', () => this._connectionsById.delete(user.id));

    if (!this.hasAvailableGames()) {
      this._games.push(new Game(this._io));
    }

    this.assignUserToGame(user);
  }

  hasAvailableGames() {
    return this._games.filter(aGame => aGame.isAvailable()).length > 0;
  }

  assignUserToGame(user) {
    for (let i = 0; i < this._games.length; i++) {
      if (this._games[i].isAvailable()) {
        this._games[i].addUser(user);
        break;
      }
    }
  }
}

module.exports = GameManager;
