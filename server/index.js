const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const GameMenager = require('./dist/GameMenager').GameMenager

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const { getCard } = require('./game');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const gamesPlayed = [];

const dir = path.resolve(__dirname, 'public');

app.use(cors());
app.use(router);
app.use(express.static(dir))


io.on('connect', (socket) => {

  socket.on('join', ({ name, room, playerID }, callback) => {
      console.log('JOIN')
      let game = gamesPlayed.find(gameMenager => gameMenager.roomName === room);
      if(game == null) {
        console.log('Creating NEW game');
        game = new GameMenager(room);
        game.setDeck(0);
        gamesPlayed.push(game);
      }
      // DEBUG
      //console.log(gamesPlayed)
      //console.log(playerID);
      //console.log(game.players);
      //console.log(game.getPlayer(Number(playerID)));
      // DEBUG
  
      let player = game.getPlayer(Number(playerID))
      if (player == null) {
        game.addPlayer(name, socket);
      } else {
        player.setSocket(socket);
      }
      game.sendGameStateToPlayers();

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