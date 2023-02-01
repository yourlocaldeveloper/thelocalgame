const express = require('express');
const Card = require('../model/card');
const { resetRFID, findFirstHand } = require('../helpers/rfid');
const router = express.Router();

const allCards = [
  'Ah',
  '2h',
  '3h',
  '4h',
  '5h',
  '6h',
  '7h',
  '8h',
  '9h',
  'Th',
  'Jh',
  'Qh',
  'Kh',
  'Ad',
  '2d',
  '3d',
  '4d',
  '5d',
  '6d',
  '7d',
  '8d',
  '9d',
  'Td',
  'Jd',
  'Qd',
  'Kd',
  'As',
  '2s',
  '3s',
  '4s',
  '5s',
  '6s',
  '7s',
  '8s',
  '9s',
  'Ts',
  'Js',
  'Qs',
  'Ks',
  'Ac',
  '2c',
  '3c',
  '4c',
  '5c',
  '6c',
  '7c',
  '8c',
  '9c',
  'Tc',
  'Jc',
  'Qc',
  'Kc',
];

const registerHand = async (inputCard) => {
  const hand = await findFirstHand();
  const { _id } = await hand[0];
  console.log('TEST', inputCard);
  console.log('UID', hand);

  const query = { _id: inputCard };

  await Card.findOneAndUpdate(query, { _id: inputCard, uid: _id });

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

router.post('/add', async (req, res) => {
  const { card } = req.body;

  await registerHand(card);

  const data = await findAllCards();
  res.send(data);
});

router.delete('/reset', async (req, res) => {
  await Card.deleteMany({});

  await allCards.map((card) => {
    Card.create({ _id: card, uid: '' }, (err) => {
      if (err) return console.log('ERROR (REGISTER HAND):', err);
    });
  });

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
