const express = require('express');
const mongoose = require('mongoose');
const rfidRouter = require('./routes/rfid');
const cardRouter = require('./routes/card');
const app = express();
const port = 8080;
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket) => {
  console.log('Tablet has connected to server.');

  socket.on('initialPlayerData', (data) => {
    console.log(data);
    io.emit('initialPlayerData', data);
  });

  socket.on('preflopOrder', (data) => {
    io.emit('preflopOrder', data);
  });

  socket.on('submitEffectiveAction', (data) => {
    console.log('[DISPLAY PLAYER]:', data);
    io.emit('submitEffectiveAction', data);
  });

  socket.on('displayPlayer', (data) => {
    console.log('[DISPLAY PLAYER]:', data);
    io.emit('displayPlayer', data);
  });

  socket.on('resetLivestream', (data) => {
    console.log(data);
    io.emit('resetLivestream', data);
  });

  socket.on('1', (data) => {
    console.log(data);
    io.emit('1', data);
  });

  socket.on('2', (data) => {
    console.log(data);
    io.emit('2', data);
  });

  socket.on('3', (data) => {
    console.log(data);
    io.emit('3', data);
  });

  socket.on('4', (data) => {
    console.log(data);
    io.emit('4', data);
  });

  socket.on('5', (data) => {
    console.log(data);
    io.emit('5', data);
  });

  socket.on('6', (data) => {
    console.log(data);
    io.emit('6', data);
  });

  socket.on('7', (data) => {
    console.log(data);
    io.emit('7', data);
  });

  socket.on('8', (data) => {
    console.log(data);
    io.emit('8', data);
  });

  socket.on('9', (data) => {
    console.log(data);
    io.emit('9', data);
  });

  socket.on('currentStreet', (data) => {
    console.log('Current Street:', data);
    io.emit('currentStreet', data);
  });

  socket.on('pot', (data) => {
    console.log('Pot:', data);
    io.emit('pot', data);
  });
});

io.on('disconnect', (socket) => {
  console.log('Tablet has disconnected to server.');
});

app.locals.disableRFIDRoute = false;

app.set('socketio', io);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', '*');

  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json());

app.use('/rfid', rfidRouter);

app.use('/card', cardRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

server.listen(3001, () => {
  console.log('listening on *:3000');
});
