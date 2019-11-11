const mongoose = require('mongoose');

const awardSchema = mongoose.Schema({
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  title: { type: String, required: true},
  date: { type: String, required: true},
  description: { type: String, required: true}
});

module.exports = mongoose.model('Award', awardSchema);
