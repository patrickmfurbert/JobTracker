const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
})

const ApplicationSchema = new mongoose.Schema({
  email: String,
  company: String,
  role: String,
  application_date: String, 
  location: String, 
  description: String
})

module.exports = mongoose.model('user', UserSchema)
module.exports = mongoose.model('jobapp', ApplicationSchema)