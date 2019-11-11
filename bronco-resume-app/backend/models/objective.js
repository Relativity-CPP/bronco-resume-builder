const mongoose = require('mongoose');

const objectiveSchema = mongoose.Schema({
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  statement: { type: String, required: true},
});
module.exports = mongoose.model('Objective', objectiveSchema);
