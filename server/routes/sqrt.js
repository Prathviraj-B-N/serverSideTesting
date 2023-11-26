const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { userId, operand1, operator } = req.body;

  // Check if operands and operator are provided
  if (!userId || !operand1 || !operator || operator !== 'sqrt') {
    return res.status(400).json({ error: 'Invalid request. Please provide valid user ID, operand, and use the square root operator (sqrt).' });
  }

  // Convert operand to number
  const num = parseFloat(operand1);

  // Check if the operand is a non-negative number
  if (isNaN(num) || num < 0) {
    return res.status(400).json({ error: 'Square root can only be calculated for non-negative numbers.' });
  }

  // Calculate square root
  const result = Math.sqrt(num);

  res.json({ result: result.toString() });
});

module.exports = router;