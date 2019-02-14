var socket = io();

socket.on('connect', function () {
  console.log('Connected to server!.');

  socket.emit('createMessage', {
    to: 'Shajie',
    text: 'Most Senior VvS'
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server!.');
});

socket.on('newMessage', function (message) {
  console.log('New Message received!.', message);
});
