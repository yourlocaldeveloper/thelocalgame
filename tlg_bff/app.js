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
});

io.on('disconnect', (socket) => {
  console.log('Tablet has disconnected to server.');
});

app.locals.disableRFIDRoute = false;

app.set('socketio', io);

// const main = async () => {
//   await mongoose.connect('mongodb://127.0.0.1:27017/thelocalgame');
//   console.log('DATABASE: Connected');
// };

// main().catch((err) => console.log(err));

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(express.json());

app.use('/rfid', rfidRouter);

app.use('/card', cardRouter);

server.listen(3001, () => {
  console.log('listening on *:3000');
});
