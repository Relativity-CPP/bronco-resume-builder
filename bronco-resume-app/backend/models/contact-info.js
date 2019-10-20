const mongoose = require('mongoose');

const contactInfoSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  homeAddress: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  emailAddress: {type: String, required: true},
  socialMediaLink: {type: String, required: true}
});
module.exports = mongoose.model('ContactInfo', contactInfoSchema);
