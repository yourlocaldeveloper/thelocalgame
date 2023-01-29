const mongoose = require('mongoose');
const { Schema } = mongoose;

const cardSchema = new Schema({
  _id: String,
  card: String,
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
