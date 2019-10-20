const mongoose = require('mongoose');

const projectsSchema = mongoose.Schema({
  title: { type: String, required: true},
  startDate: { type: String, required: true},
  endDate: { type: String, required: true},
  description: { type: String, required: true}

});
module.exports = mongoose.model('Projects', projectsSchema);
