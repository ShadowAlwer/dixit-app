const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const { getCard } = require('./game');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const dir = path.resolve(__dirname, 'public');

app.use(cors());
app.use(router);
app.use(express.static(dir))


io.on('connect', (socket) => {

  socket.on('join', ({ name, room, playerID }, callback) => {
      const existingUser = getUser(playerID);
      console.dir(existingUser);
      if (existingUser == null) {
      const { error, user } = addUser({ name, room });

      if(error) return callback(error);

      socket.join(user.room);
      socket.emit('playerID', user);
      socket.emit('message', { user: 'admin', text: `${user.name} id: ${user.id}, welcome to room ${user.room}. Have a nice day`});
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

      callback();
    } else {
      socket.emit('message', { user: 'admin', text: `${existingUser.name} id: ${existingUser.id}, hello again.`});
      io.to(existingUser.room).emit('roomData', { room: existingUser.room, users: getUsersInRoom(existingUser.room) });
    }
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(message.id);

    io.to(user.room).emit('message', { user: user.name, text: message.message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })

  socket.on('getCard', () => {
    socket.emit('setCard', getCard());
  })

});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));