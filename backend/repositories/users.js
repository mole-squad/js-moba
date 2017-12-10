class Users {
  constructor() {
    this.users = [];
  }

  get(user_id) {
    return this.users.find(user => user.id == user_id);
  }

  // private

  _addUser(user) {
    this.users.push(user);
  }
}

let instance;

module.exports = function() {
  instance = instance || new Users();
  return instance;
}
