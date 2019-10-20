const mongoose = require('mongoose');

const experienceSchema = mongoose.Schema({
  companyName: { type: String, required: true},
  jobTitle: { type: String, required: true},
  jobStartDate:{ type: String, required: true},
  jobEndDate: { type: String, required: true},
  description: { type: String, required: true},
});
module.exports = mongoose.model('Experience', experienceSchema);
