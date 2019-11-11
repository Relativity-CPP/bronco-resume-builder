const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  title: { type: String, required: true},
  startDate: { type: String, required: true},
  endDate: { type: String, required: true},
  description: { type: String, required: true}

});
module.exports = mongoose.model('Project', projectSchema);
