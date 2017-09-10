var express = require('express'),
    path = require('path'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    fs = require('fs');

// Get list of the bad words
// var BAD_WORDS = fs.readFile('./badwords.txt', 'utf8', (err, data) => {
//   if(err) throw err;
//   return data.split(',');
// });

// Serve static files
app.use('/public', express.static('public'));
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

// Start Express server
const PORT = 3000;
http.listen(PORT,  function () {
    console.log('Server listening on', PORT);
});

//////////////////////////////////////////////////////////////////
// SOCKET.IO
// -------------
// Possible events:
// connection
//
// LOGIN_CHECK
// LOGIN
// MSG
//
// disconnect
//

var users = [];

io.on('connection', function(socket) {
  console.log('NEW CONNECTION');

  // User clicks "Log in button"
  // 1. Check if username is valid [aggresive usernames]
  // 2. Check if username is available [not taken]
  // 4. Check if username is blank or too short
  // 3. Send username back, and/or error.
  socket.on('LOGIN_CHECK', function(username){
    let error = 0;

    // if(_isOffensive(username, BAD_§WORDS)) error = 1;
    if(users.indexOf(username) > -1) error = 2;
    if(username.length === '' || username.length < 3) error = 3;

    let response = { error, username };
    if(!error) {
      socket.username = username;
    }

    socket.emit('LOGIN_CHECK', response);
  });

  // USER AUTH
  socket.on('AUTH', function() {
    let response = {};
    if(!socket.username) {
      response.auth = false;
    } else {
      response.auth = true;
      response.username = socket.username;
      response.users = users;
    }

    socket.emit('AUTH', response);
  });
  // 1. USER LOGIN
  socket.on('LOGIN', function() {
    console.log(socket.username, ' succesfuly logged in');
    users.push(socket.username);
    console.log(users);
  });

  //2. SEND MESSAGE
  socket.on('MSG', function (msg) {
    let response = {
      msg,
      user: socket.username || 'Andrzej'
    };
    io.emit('MSG', response);
  });

// disconnect
  socket.on('disconnect', function() {
    const username = socket.username;
    if(username && users.includes(username)) {
      console.log(username + ' has disconnected');
      let index = users.indexOf(username)
      users.splice(index, 1);
    }
  });
});

// function _isOffensive(str, BAD_WORDS) {
  // let regexp = new RegExp(BAD_WORDS.join('|'), 'i');
  // return str.match(regexp);
  // return false;
// }
