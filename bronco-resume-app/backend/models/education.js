const mongoose = require('mongoose');

const educationSchema = mongoose.Schema({
  schoolName: { type: String, required: true},
  degreeType: { type: String, required: true},
  major: { type: String, required: true},
  schoolStartDate: { type: String, required: true},
  schoolEndDate: { type: String, required: true},
  gpa: { type: String, required: true}
});
module.exports = mongoose.model('Education', educationSchema);
