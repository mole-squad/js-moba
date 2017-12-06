const socket = io();

socket.on('message', (msg) => {
  console.log(msg);
});

socket.on('JOIN_GAME', gameId => {
  console.log(`joined game ${gameId}`);
});

socket.on('delta', update => {
  console.log(`Delta: ${update}`);
});
