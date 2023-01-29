const e = require('express');
const RFID = require('../model/rfid');

const resetRFID = () => {
  const status = RFID.deleteMany({}, (err) => {
    if (err) {
      return false;
    } else {
      return true;
    }
  });

  return status;
};

const findFirstHand = async () => {
  const data = await RFID.find({}).limit(1);

  if (data) return data;
};

module.exports = {
  resetRFID,
  findFirstHand,
};
