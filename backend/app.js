const app = require('express')(),
      http = require('http').Server(app),
      path = require('path'),
      io = require('socket.io')(http);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/../build/index.html'));
});

io.on('connection', (socket) => {
  console.log('user connected');
})

http.listen(3000, () => {
  console.log('listening on 3000');
})
