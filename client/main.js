import Game from './src/game';

const socket = io();
let activeGame;

socket.on('message', (msg) => {
  console.log(msg);
});

socket.on('JOIN_GAME', gameId => {
  activeGame = new Game(gameId, socket);
});
