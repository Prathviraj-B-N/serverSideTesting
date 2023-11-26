const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { userId, operand1, operand2, operator } = req.body;

  // Check if operands and operator are provided
  if (!userId || !operand1 || !operand2 || !operator || operator !== '^') {
    return res.status(400).json({ error: 'Invalid request. Please provide valid user ID, operands, and use the power operator (^).' });
  }

  // Convert operands to numbers
  const base = parseFloat(operand1);
  const exponent = parseFloat(operand2);

  // Check if the operands are valid numbers
  if (isNaN(base) || isNaN(exponent)) {
    return res.status(400).json({ error: 'Please provide valid numbers for base and exponent.' });
  }

  // Calculate power
  const result = Math.pow(base, exponent);

  res.json({ result: result.toString() });
});

module.exports = router;