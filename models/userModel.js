const mongoose = require('mongoose');


// name,role,email,phoneNumber

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  
});

const User = mongoose.model('User', userSchema);

module.exports = {User};