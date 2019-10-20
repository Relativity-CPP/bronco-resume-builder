const mongoose = require('mongoose');

const skillsSchema = mongoose.Schema({
  description: { type: String, required: true},

});
module.exports = mongoose.model('Skills', skillsSchema);
