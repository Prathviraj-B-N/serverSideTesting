const express = require('express');
const router = express.Router();

// p1
router.post('/', (req, res) => {
  const { userId, operand1, operator } = req.body;

  // Check if operands and operator are provided
  if (!userId || !operand1 || !operator || operator !== '!') {
    // p2
    return res.status(400).json({ error: 'Invalid request. Please provide valid user ID, operand, and use the factorial operator (!).' });
  }

  // p3
  const num = parseInt(operand1);

  // Check if the operand is a non-negative integer
  if (isNaN(num) || num < 0 || num % 1 !== 0) {
    // p4
    return res.status(400).json({ error: 'Factorial can only be calculated for non-negative integers.' });
  }

  // p5
  let result = 1;

  // p6
  for (let i = 2; i <= num; i++) {
    result *= i;
  }

  // p7
  const Calculation = require('../models/Calculation')
  const newCalculation = new Calculation({
    userId: userId,
    operand1: operand1,
    operand2: null,
    operator: operator,
    result: result
  });
  
  // p8
  newCalculation.save()
  .then(savedCalculation => {
    // p9
    console.log('Calculation saved:', savedCalculation);
  })
  .catch(error => {
    // p10
    console.error('Error saving calculation:', error);
  });

  //p11
  res.json({ result: result.toString() });
});

module.exports = router;