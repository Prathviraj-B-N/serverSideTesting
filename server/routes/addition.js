const express = require('express');
const router = express.Router();

function add(operand1, operand2) {
  return operand1 + operand2;
}

router.post('/', (req, res) => {
  const { userId, operand1, operand2, operator } = req.body;

  if (!userId || !operand1 || !operand2 || !operator || operator !== "+") {
    return res.status(400).json({ error: "Invalid request. Please provide valid user ID, operands, and operator (+)." });
  }

  const num1 = parseFloat(operand1);
  const num2 = parseFloat(operand2);

  const result = add(num1, num2);

  const Calculation = require('../models/Calculation')
  const newCalculation = new Calculation({
    userId: userId,
    operand1: operand1,
    operand2: operand2,
    operator: operator,
    result: result
  });
  
  newCalculation.save()
  .then(savedCalculation => {
    console.log('Calculation saved:', savedCalculation);
  })
  .catch(error => {
    console.error('Error saving calculation:', error);
  });
  res.json({ result: result.toString() });
});

module.exports = router;