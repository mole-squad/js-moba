const app = require('./app');
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);

const GameManager = require('./src/GameManager');

const gameManager = new GameManager(io);

// TODO substitute with env variable
app.set('port', 3000);

http.listen(app.get('port'), () => {
  console.log('listening on 3000');
});
