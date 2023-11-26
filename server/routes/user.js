const express = require('express');
const router = express.Router();
const Calculation = require('../models/Calculation')
const User = require('../models/User')

router.get('/', (req,res) => res.status(500).json({ info: 'User Api working' }))

router.post('/add', async (req, res) => {
    try {
      const { username, email } = req.body;
  
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      // Create a new user
      const newUser = new User({ username, email });
  
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  });
  

router.post('/save-calculation', async (req, res) => {
    try {
      // Assume the request body contains userId, expression, and result
      const { userId, expression, result } = req.body;
  
      // Create a new calculation
      const newCalculation = new Calculation({
        userId,
        expression,
        result,
      });
  
      // Save the calculation to the database
      await newCalculation.save();
  
      res.json({ message: 'Calculation saved successfully' });
    } catch (error) {
      console.error('Error saving calculation:', error);
      res.status(500).json({ error: 'Failed to save calculation' });
    }
  });

  router.get('/history/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Find calculations by user ID
      const userCalculations = await Calculation.find({ userId });
  
      res.json({ calculations: userCalculations });
    } catch (error) {
      console.error('Error fetching calculations:', error);
      res.status(500).json({ error: 'Failed to fetch calculations' });
    }
  });

  module.exports = router;