const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  username: String,
  password: String, // hashed
  role: { type: String, enum: ['student', 'staff'] }
});
module.exports = mongoose.model('User', UserSchema);
