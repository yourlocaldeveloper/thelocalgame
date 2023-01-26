const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('It is here test');
});

router.post('/', (req, res) => {
  console.log('JSON Provided: ', req.body);
  res.send(req.body);
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
