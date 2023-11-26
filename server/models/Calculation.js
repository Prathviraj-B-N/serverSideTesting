const mongoose = require('mongoose');

const calculationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  operand1: Number,
  operand2: Number,
  operator: String,
  result: Number
});

module.exports = mongoose.model('Calculation', calculationSchema);