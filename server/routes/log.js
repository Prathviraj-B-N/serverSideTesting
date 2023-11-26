const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { userId, operand1, operator } = req.body;

  // Check if operands and operator are provided
  if (!userId || !operand1 || !operator || operator !== 'log2') {
    return res.status(400).json({ error: 'Invalid request. Please provide valid user ID, operand, and use the log base 2 operator (log2).' });
  }

  // Convert operand to number
  const num = parseFloat(operand1);

  // Check if the operand is a positive number
  if (isNaN(num) || num <= 0) {
    return res.status(400).json({ error: 'Log base 2 can only be calculated for positive numbers.' });
  }

  // Calculate base-2 logarithm
  const result = Math.log2(num);

  res.json({ result: result.toString() });
});

module.exports = router;