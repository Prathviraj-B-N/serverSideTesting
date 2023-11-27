const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  //p1
  const { userId, operand1, operand2, operator } = req.body;

  // Check if operands and operator are provided
  if (!userId || !operand1 || !operand2 || !operator || operator !== '^') {
    //p2
    return res.status(400).json({ error: 'Invalid request. Please provide valid user ID, operands, and use the power operator (^).' });
  }

  // Convert operands to numbers
  //p3
  const base = parseFloat(operand1);
  const exponent = parseFloat(operand2);

  // Check if the operands are valid numbers
  if (isNaN(base) || isNaN(exponent)) {
    //p4
    return res.status(400).json({ error: 'Please provide valid numbers for base and exponent.' });
  }

  // Calculate power

  //p5
  const result = Math.pow(base, exponent);
  const Calculation = require('../models/Calculation')
  const newCalculation = new Calculation({
    userId: userId,
    operand1: operand1,
    operand2: operand2,
    operator: operator,
    result: result
  });
  

  //p6
  newCalculation.save()
  .then(savedCalculation => {
    //p7
    console.log('Calculation saved:', savedCalculation);
  })
  .catch(error => {
    //p8
    console.error('Error saving calculation:', error);
  });
  //p9
  res.json({ result: result.toString() });
});

module.exports = router;