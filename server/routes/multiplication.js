const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { userId, operand1, operand2, operator } = req.body;

  // Check if operands and operator are provided
  if (!userId || !operand1 || !operand2 || !operator || operator !== '*') {
    return res.status(400).json({ error: 'Invalid request. Please provide valid user ID, operands, and use the multiplication operator (*).' });
  }

  // Convert operands to numbers
  const num1 = parseFloat(operand1);
  const num2 = parseFloat(operand2);

  // Check if the operands are valid numbers
  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: 'Please provide valid numbers for multiplication.' });
  }

  // Calculate multiplication
  const result = num1 * num2;

  res.json({ result: result.toString() });
});

module.exports = router;