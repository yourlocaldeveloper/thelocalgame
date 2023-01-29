const express = require('express');
const RFID = require('../model/rfid');
const { resetRFID } = require('../helpers/rfid');
const router = express.Router();

const handleRfidInput = async (input) => {
  const { uid, device_name, antenna } = input;

  await RFID.create(
    { _id: uid, device_name: device_name, antenna: antenna },
    (err) => {
      if (err) return console.log('ERROR (REGISTER RFID):', err);
    }
  );
};

router.get('/', async (req, res) => {
  const data = await RFID.find({});
  res.send(data);
});

router.post('/', (req, res) => {
  console.log('JSON Provided: ', req.body);
  res.send(req.body);
  handleRfidInput(req.body);
});

router.delete('/reset', (req, res) => {
  const status = resetRFID();

  if (status) {
    res.status(400).send('RFID DB RESET');
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
