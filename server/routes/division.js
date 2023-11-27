const express = require('express');
const router = express.Router();

// p1
router.post('/', (req, res) => {
  const { userId, operand1, operand2, operator } = req.body;

  // Check if operands and operator are provided
  if (!userId || !operand1 || !operand2 || !operator || operator !== '/') {
    // p2
    return res.status(400).json({ error: 'Invalid request. Please provide valid user ID, operands, and operator.' });
  }

  // p3
  const num1 = parseFloat(operand1);
  const num2 = parseFloat(operand2);

  // Check if the second operand is not zero to prevent division by zero
  if (num2 === 0) {
    // p4
    return res.status(400).json({ error: 'Division by zero is not allowed' });
  }

  // p5
  const result = num1 / num2;

  const Calculation = require('../models/Calculation')
  const newCalculation = new Calculation({
    userId: userId,
    operand1: operand1,
    operand2: operand2,
    operator: operator,
    result: result
  });
  

  // p6
  newCalculation.save()
  .then(savedCalculation => {
    // p7
    console.log('Calculation saved:', savedCalculation);
  })
  .catch(error => {
    // p8
    console.error('Error saving calculation:', error);
  });

  //p9
  res.json({ result: result.toString() });
});

module.exports = router;