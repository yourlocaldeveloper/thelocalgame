const express = require('express');
const RFID = require('../model/rfid');
const Card = require('../model/card');
const { resetRFID } = require('../helpers/rfid');
const router = express.Router();

const handleRfidInput = (input, io) => {
  const { uid, device_name, antenna } = input;
  let rfidRoute = 'rfid';

  const deviceOne = 'TLG_Device1';
  const deviceTwo = 'TLG_Device2';

  if (device_name === deviceOne) {
    console.log('WORKS WITH DEVICE ONE');
    switch (antenna) {
      case 1:
        rfidRoute = 'seatOne';
        break;
      case 4:
        rfidRoute = 'seatTwo';
        break;
      case 8:
        rfidRoute = 'seatThree';
        break;
    }
  } else if (device_name === deviceTwo) {
    console.log('WORKS WITH DEVICE TWO');
    switch (antenna) {
      case 1:
        rfidRoute = 'communityCards';
        break;
      case 2:
        console.log('SENDING');
        rfidRoute = 'seatFour';
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

  // await RFID.create(
  //   { _id: uid, device_name: device_name, antenna: antenna },
  //   (err) => {
  //     if (err) return console.log('ERROR (REGISTER RFID):', err);
  //   }
  // );
};

router.get('/', async (req, res) => {
  const data = await RFID.find({});
  res.send(data);
});

router.get('/position/:rfid/:id', async (req, res) => {
  const data = await RFID.find({
    device_name: req.params.rfid,
    antenna: req.params.id,
  });
  let ids = [];

  if (data) {
    data.forEach(async (data) => {
      const { _id: cardID } = data;
      ids.push(cardID);
    });
  }

  Card.find({ _id: { $in: ids } }, (err, cardData) => {
    if (err) return console.log('error');

    let returnCards = [];

    if (cardData) {
      cardData.forEach(async (singleCard) => {
        const { card: cardValue } = singleCard;
        returnCards.push(cardValue);
      });
    }

    return res.send(returnCards);
  });
});

router.post('/', (req, res) => {
  if (req.app.locals.disableRFIDRoute) {
    console.log('JSON Denied: ', req.body);
    res.send(req.body);
  } else {
    console.log('JSON Provided: ', req.body);
    res.send(req.body);
    const io = req.app.get('socketio');
    handleRfidInput(req.body, io);
  }
});

router.post('/stop', (req, res) => {
  req.app.locals.disableRFIDRoute = true;
  res.send(req.body);
});

router.post('/continue', (req, res) => {
  req.app.locals.disableRFIDRoute = false;
  res.send(req.body);
});

router.delete('/reset', (req, res) => {
  const status = resetRFID();

  if (status) {
    res.status(200).send('RFID DB RESET');
  } else {
    res.status(500).send('RFID DB RESET ERROR!!!');
  }
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
