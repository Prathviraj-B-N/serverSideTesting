const express = require('express');
const router = express.Router();
const Calculation = require('../models/Calculation')
const User = require('../models/User')

//p1
router.get('/', (req,res) => res.status(500).json({ info: 'User Api working' }))

//p2
router.post('/add', async (req, res) => {
  
    try {
      //p3
      const { username, email } = req.body;
  
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        //p4
        return res.status(400).json({ error: 'User already exists' });
      }
  
      // Create a new user
      //p5
      const newUser = new User({ username, email });
  
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      //p6
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  });
  
//p7
router.post('/save-calculation', async (req, res) => {
    try {
      // Assume the request body contains userId, expression, and result
      //p8
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
      //p9
      console.error('Error saving calculation:', error);
      res.status(500).json({ error: 'Failed to save calculation' });
    }
  });

  //p10
  router.get('/history/:userId', async (req, res) => {
    try {
      //p11
      const { userId } = req.params;
  
      // Find calculations by user ID
      const userCalculations = await Calculation.find({ userId });
  
      res.json({ calculations: userCalculations });
    } catch (error) {
      //p12
      console.error('Error fetching calculations:', error);
      res.status(500).json({ error: 'Failed to fetch calculations' });
    }
  });

  module.exports = router;