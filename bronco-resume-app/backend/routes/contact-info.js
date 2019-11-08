const express = require('express');

const router = express.Router();

const ContactInfo = require('../models/contact-info');

router.post('', (req, res, next) => {
  const contactInfo = new ContactInfo({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    homeAddress: req.body.homeAddress,
    phoneNumber: req.body.phoneNumber,
    emailAddress: req.body.emailAddress,
    socialMediaLink: req.body.socialMediaLink
  });
  contactInfo.save().then(createdContactInfo => {
    res.status(201).json({
      message: 'Contact Info added successfully.',
      contactInfoId: createdContactInfo._id
    });
  });
});

router.get('', (req, res, next) => {
  ContactInfo.findOne()
  .then(document => {
    res.status(200).json({
      message: 'ContactInfo fetched successfully!',
      contactInfo: document
    })
  })
});

module.exports = router;
