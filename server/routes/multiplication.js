const express = require('express');
const router = express.Router();

// p1
router.post('/', (req, res) => {
  const { userId, operand1, operand2, operator } = req.body;

  // Check if operands and operator are provided
  if (!userId || !operand1 || !operand2 || !operator || operator !== '*') {
    // p2
    return res.status(400).json({ error: 'Invalid request. Please provide valid user ID, operands, and use the multiplication operator (*).' });
  }

  // p3
  const num1 = parseFloat(operand1);
  const num2 = parseFloat(operand2);

  // Check if the operands are valid numbers
  if (isNaN(num1) || isNaN(num2)) {
    // p4
    return res.status(400).json({ error: 'Please provide valid numbers for multiplication.' });
  }

  // p5
  const result = num1 * num2;
  
  // p6
  const Calculation = require('../models/Calculation')
  const newCalculation = new Calculation({
    userId: userId,
    operand1: operand1,
    operand2: operand2,
    operator: operator,
    result: result
  });
  
  // p7
  newCalculation.save()
  .then(savedCalculation => {
    //p8
    console.log('Calculation saved:', savedCalculation);
  })
  .catch(error => {
    //p9
    console.error('Error saving calculation:', error);
  });
  //p10
  res.json({ result: result.toString() });
});

module.exports = router;