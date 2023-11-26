const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  // Additional user fields as needed
});

module.exports = mongoose.model('User', userSchema);
