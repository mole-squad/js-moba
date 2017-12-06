const app = require('express')(),
      http = require('http').Server(app),
      path = require('path'),
      io = require('socket.io')(http);


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header('Access-Control-Allow-Credentials', "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/../build/index.html'));
});

io.on('connection', (socket) => {
  console.log('user connected');

  io.emit('message', 'hello world!');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
})

http.listen(3000, () => {
  console.log('listening on 3000');
})
