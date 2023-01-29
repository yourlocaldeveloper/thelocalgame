const mongoose = require('mongoose');
const { Schema } = mongoose;

const rfidSchema = new Schema({
  _id: String,
  device_name: String,
  antenna: Number,
});

const RFID = mongoose.model('RFID', rfidSchema);

module.exports = RFID;

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
