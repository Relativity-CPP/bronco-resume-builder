const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
  description: { type: String, required: true},

});
module.exports = mongoose.model('Skill', skillSchema);
