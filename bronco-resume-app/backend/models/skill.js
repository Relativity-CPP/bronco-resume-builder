const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  description: { type: String, required: true},
});
module.exports = mongoose.model('Skill', skillSchema);
