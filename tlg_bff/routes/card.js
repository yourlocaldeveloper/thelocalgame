const express = require('express');
const Card = require('../model/card');
const { resetRFID, findFirstHand } = require('../helpers/rfid');
const router = express.Router();

const registerHand = async (inputCard) => {
  const hand = await findFirstHand();
  const { _id } = hand[0];
  console.log('TEST', inputCard);

  await Card.create({ _id: _id, card: inputCard }, (err) => {
    if (err) return console.log('ERROR (REGISTER HAND):', err);
  });

  resetRFID();
};

const findAllCards = async () => {
  const data = await Card.find({});

  return data;
};

router.get('/', (req, res) => {
  res.send('Hand Model Route');
});

router.get('/all', async (req, res) => {
  const data = await findAllCards();
  res.send(data);
});

// TEST FUNCTION
router.get('/test', async (req, res) => {
  const hand = await findFirstHand();
  res.send(hand);
});

router.post('/add', (req, res) => {
  const { card } = req.body;

  registerHand(card);

  res.send('Hand Added');
});

router.delete('/reset', async (req, res) => {
  await Card.deleteMany({});
  res.send('Database Reset');
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

// Create RFID Database
// Store RFID Information

// MISSING FROM FLOW: When and how we delay the trigger to get the card on the reader. Potentially need to remove route and re-add it and listen to event?
// Flow:
// FE Application Creates POST request to /add route
// In POST Request it sends Hand it wants to register
// I would then place card on RFID reader
// Query RFID Database for hand selected
// If successfull add hand to hand DB and return that it has been registed
