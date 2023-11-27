const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  //p1
  const { userId, operand1, operator } = req.body;

  // Check if operands and operator are provided
  if (!userId || !operand1 || !operator || operator !== 'sqrt') {
    //p2
    return res.status(400).json({ error: 'Invalid request. Please provide valid user ID, operand, and use the square root operator (sqrt).' });
  }

  // Convert operand to number
  //p3
  const num = parseFloat(operand1);

  // Check if the operand is a non-negative number
  if (isNaN(num) || num < 0) {
    //p4
    return res.status(400).json({ error: 'Square root can only be calculated for non-negative numbers.' });
  }

  // Calculate square root
  //p5
  const result = Math.sqrt(num);
  const Calculation = require('../models/Calculation')
  const newCalculation = new Calculation({
    userId: userId,
    operand1: operand1,
    operand2: null,
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
  res.json({ result: result });
});

module.exports = router;