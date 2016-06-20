var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Serve static files
app.use('/dist', express.static('dist'));

// Start Express server
const port = 3000;
http.listen(port,  function () {
    console.log('Server listening on', port);
});

//////////////////////////////////////////////////////////////////
// IO connection

let connections = [];

io.on('connection', function(socket) {
  connections.push(socket);
  io.emit('userCount', connections.length);
  console.log('NEW CONNECTION', ' USERS ONLINE: ', connections.length);

  //1. USER LOGIN
  socket.on('user:login', function(data) {
    console.log(data, ' succesfuly logged in');
  });

  //2. SEND MESSAGE
  socket.on('new message', function (data) {
    io.emit('new message', data);
    console.log(data.user, ": ",  data.msg);
  });

// IO disconnect
  socket.on('disconnect', function () {
    connections.splice(connections.indexOf(socket), 1);
    io.emit('userCount', connections.length);
    console.log('CONNECTION LOST');
  });
});
