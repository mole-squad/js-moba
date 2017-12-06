const { createStore } = require('redux');
const rootReducer = require('./reducers/reducers');

const { newUser, userDisconnect } = require('./actions/users');

class Store {
  constructor(io) {
    this._io = io;
    this._store = createStore(rootReducer);

    this.listenForConnections();
  }

  listenForConnections() {
    var self = this;

    this._io.on('connection', (socket) => {
      self._store.dispatch(newUser(socket));

      socket.on('disconnect', () => self._store.dispatch(userDisconnect(socket)));
    });
  }
}

module.exports = Store;
