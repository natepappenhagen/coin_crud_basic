const mongoose = require('mongoose');

const HoldingSchema = new mongoose.Schema({
  name: {type: String, required: true},
  marketPriceUSD: {type: Number, required: false},
  cost: {type: Number, required: false},
  numOfHoldings: {type: Number, required: false},
  date: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Holding', HoldingSchema);