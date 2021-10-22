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

const users = mongoose.model('user', UserSchema);
const jobapps = mongoose.model('jobapp', ApplicationSchema);

module.exports = {
  users: users,
  jobapps: jobapps
}