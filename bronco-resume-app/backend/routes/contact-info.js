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
    socialMediaLink: req.body.socialMediaLink,
    creator: req.userData.userId
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
  ContactInfo.find({creator: req.userData.userId})
  .then(document => {
    console.log('this');
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
  ContactInfo.updateOne({_id: req.params.id, creator: req.userData.userId}, contact)
  .then( result => {
    if (result.nModified > 0) {
      res.status(200).json({message: 'Update successful!'})
    } else {
      res.status(401).json({message: 'Not authorized!'})
    }
  })
});

module.exports = router;
