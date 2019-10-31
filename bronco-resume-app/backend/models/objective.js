const mongoose = require('mongoose');

const objectiveSchema = mongoose.Schema({
  statement: { type: String, required: true},
});
module.exports = mongoose.model('Objective', objectiveSchema);
