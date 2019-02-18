const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
// const ejs = require('ejs');
// const engine = require('ejs-mate');


const {generateMessage, generateLocationMessage} = require('./utils/message')
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
// app.engine('ejs', engine);
// app.set('view-engine', 'ejs');

// require('./../routes/userRoutes')(app);

// app.get('/signup', (req, res) => {
//   res.render('signup');
// });

io.on('connection', (socket) => {
  console.log('New user connected!');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app!'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('Message to look up!', message);

    io.emit('newMessage', generateMessage(message.from,message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  })

  socket.on('disconnect', (socket) => {
    console.log('User disconnected!');
  });
});



server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
})
