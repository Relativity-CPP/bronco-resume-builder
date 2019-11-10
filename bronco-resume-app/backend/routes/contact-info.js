const express = require('express');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

const ContactInfo = require('../models/contact-info');

router.post('',
  checkAuth, (req, res, next) => {
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

router.get('',
  checkAuth, (req, res, next) => {
  ContactInfo.findOne()
  .then(document => {
    res.status(200).json({
      message: 'ContactInfo fetched successfully!',
      contactInfo: document
    })
  })
});

router.put('/:id',
  checkAuth, (req, res, next) => {
  const contact = new ContactInfo({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    homeAddress: req.body.homeAddress,
    phoneNumber: req.body.phoneNumber,
    emailAddress: req.body.emailAddress,
    socialMediaLink: req.body.socialMediaLink,
    _id: req.body.id
  })
  console.log(contact);
  ContactInfo.updateOne({_id: req.params.id}, contact)
  .then( result => {
    console.log(result);
    res.status(200).json({message: 'Update successful!'})
  })
});

module.exports = router;
