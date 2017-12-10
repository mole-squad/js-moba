// const Game = require('./game');
// const User = require('./user');

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

    this.assignUserToGame(user);
  }
}

module.exports = GameManager;
