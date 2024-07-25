const express = require('express');
const RFID = require('../model/rfid');
const Card = require('../model/card');
const { resetRFID, getEquityPercentages } = require('../helpers/rfid');
const router = express.Router();

const handleRfidInput = (input, io) => {
  const { uid, device_name, antenna } = input;
  let rfidRoute = 'rfid';

  const deviceOne = 'TLG_Device1';
  const deviceTwo = 'TLG_Device2';

  if (device_name === deviceOne) {
    switch (antenna) {
      case 1:
        rfidRoute = 'seatOne';
        io.emit('1-cards', {
          msg: 'RFID - Sending',
          uid: uid,
        });
        break;
      case 4:
        rfidRoute = 'seatTwo';
        io.emit('2-cards', {
          msg: 'RFID - Sending',
          uid: uid,
        });
        break;
      case 8:
        rfidRoute = 'seatThree';
        io.emit('3-cards', {
          msg: 'RFID - Sending',
          uid: uid,
        });
        break;
    }
  } else if (device_name === deviceTwo) {
    switch (antenna) {
      case 1:
        rfidRoute = 'communityCards';
        break;
      case 2:
        rfidRoute = 'seatFour';
        io.emit('4-cards', {
          msg: 'RFID - Sending',
          uid: uid,
        });
        break;
      case 5:
        rfidRoute = 'communityCards';
        break;
      case 6:
        rfidRoute = 'communityCards';
        break;
    }
  }

  io.emit(rfidRoute, {
    msg: 'RFID - Sending',
    uid: uid,
  });
};

router.get('/', async (req, res) => {
  res.send('What do you want to see here?');
});

router.post('/', (req, res) => {
  if (req.app.locals.disableRFIDRoute) {
    res.send(req.body);
  } else {
    res.send(req.body);
    const io = req.app.get('socketio');
    handleRfidInput(req.body, io);
  }
});

router.post('/stop', (req, res) => {
  console.log('[NOTICE]: Stop RFID Card Information Being Sent');
  req.app.locals.disableRFIDRoute = true;
  res.send(req.body);
});

router.post('/continue', (req, res) => {
  console.log('[NOTICE]: Allow RFID Card Information Being Sent');
  req.app.locals.disableRFIDRoute = false;
  res.send(req.body);
});

router.post('/equity', (req, res) => {
  console.log('EQUITY REQ');
  const { players, cards, communityCards } = req.body;

  const equityReturn = getEquityPercentages(players, cards, communityCards);

  console.log('equityReturn', equityReturn);
  res.send(equityReturn);
});

module.exports = router;

// example json:

// JSON Provided:  {
//   type: 'uid',
//   uid: '94D064EB',
//   sak: 8,
//   string: 'MIFARE Classic 1k/Plus 2k',
//   device_name: 'Pepper_C1-MUX-8FC334',
//   known_tag: false,
//   antenna: 1
// }
