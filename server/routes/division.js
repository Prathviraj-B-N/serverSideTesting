const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { userId, operand1, operand2, operator } = req.body;

  // Check if operands and operator are provided
  if (!userId || !operand1 || !operand2 || !operator || operator !== '/') {
    return res.status(400).json({ error: 'Invalid request. Please provide valid user ID, operands, and operator.' });
  }

  // Convert operands to numbers
  const num1 = parseFloat(operand1);
  const num2 = parseFloat(operand2);

  // Check if the second operand is not zero to prevent division by zero
  if (num2 === 0) {
    return res.status(400).json({ error: 'Division by zero is not allowed' });
  }

  // Perform division
  const result = num1 / num2;

  res.json({ result: result.toString() });
});

module.exports = router;