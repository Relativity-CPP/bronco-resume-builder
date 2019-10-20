const mongoose = require('mongoose');

const awardsSchema = mongoose.Schema({
  title: { type: String, required: true},
  date: { type: String, required: true},
  description: { type: String, required: true}
});

module.exports = mongoose.model('Awards', awardsSchema);
