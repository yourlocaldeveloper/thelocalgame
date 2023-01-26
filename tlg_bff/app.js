const express = require('express');
const rfidRouter = require('./routes/rfid');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(express.json());

app.use('/rfid', rfidRouter);
