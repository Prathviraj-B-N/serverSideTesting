const express = require('express');
const router = express.Router();

// p0
function add(operand1, operand2) {
  return operand1 + operand2;
}

// P1
router.post('/', (req, res) => {
  const { userId, operand1, operand2, operator } = req.body;
  if (!userId || !operand1 || !operand2 || !operator || operator !== "+") {
    //p2
    return res.status(400).json({ error: "Invalid request. Please provide valid user ID, operands, and operator (+)." });
  }

  // P3
  const num1 = parseFloat(operand1);
  const num2 = parseFloat(operand2);

  // calls p0
  const result = add(num1, num2);

  const Calculation = require('../models/Calculation')
  const newCalculation = new Calculation({
    userId: userId,
    operand1: operand1,
    operand2: operand2,
    operator: operator,
    result: result
  });
  
  
  // p4
  newCalculation.save()
  .then(savedCalculation => {
    // p5
    console.log('Calculation saved:', savedCalculation);
  })
  .catch(error => {
    // p6
    console.error('Error saving calculation:', error);
  });

  //p7
  res.json({ result: result.toString() });
});

module.exports = router;