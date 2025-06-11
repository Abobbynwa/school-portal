const mongoose = require('mongoose');
const ClassSchema = new mongoose.Schema({
  name: String,
  schedule: String,
  teacher: String
});
module.exports = mongoose.model('Class', ClassSchema);
