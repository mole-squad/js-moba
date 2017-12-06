const NEW_USER = 'NEW_USER';
function newUser(connection) {
  return {
    type: NEW_USER,
    connection
  }
}

const USER_DISCONNECT = 'USER_DISCONNECT';
function userDisconnect(connection) {
  return {
    type: USER_DISCONNECT,
    connection
  };
}

module.exports = {
  USER_DISCONNECT,
  NEW_USER,
  newUser,
  userDisconnect

};
