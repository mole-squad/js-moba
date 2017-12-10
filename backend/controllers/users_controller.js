const users_repository = require('../repositories/users')();
const User = require('../models/user');

exports.createUser = (socket) => {
  const user = new User(socket);
  user.save();
  socket.emit('user_created', user.id);

  return user;
};
