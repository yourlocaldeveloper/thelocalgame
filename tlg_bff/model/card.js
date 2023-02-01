const mongoose = require('mongoose');
const { Schema } = mongoose;

const cardSchema = new Schema({
  _id: String,
  uid: String,
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
