const UsersController = require('../controllers/users_controller');
const GamesController = require('../controllers/games_controller');

function socketRoutes(io) {
  io.on('connection', socket => {
    user = UsersController.createUser(socket);

    // Callbacks
    let active_game;

    socket.on('request_game', socket => {
      active_game = GamesController.assignUserToGame(user, socket);
    });

    socket.on('disconnect', socket => {
      GamesController.onDisconnect(game, user);
    });
  });
}

module.exports = socketRoutes;
