const express = require('express');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

const Experience = require('../models/experience');

router.post('',
  checkAuth, (req, res, next) => {
  const experience = new Experience({
    companyName: req.body.companyName,
    jobTitle: req.body.jobTitle,
    jobStartDate:req.body.jobStartDate,
    jobEndDate: req.body.jobEndDate,
    description: req.body.description,
    creator: req.userData.userId
  });
  experience.save().then(createdExperience => {
    res.status(201).json({
      message: 'Experience added successfully.',
      experienceId: createdExperience._id
    });
  });
});

router.get('',
  checkAuth, (req, res, next) => {
  Experience.find({creator: req.userData.userId})
  .then(documents => {
    res.status(200).json({
      message: 'Experience fetched successfully!',
      experience: documents
    })
  })
});

router.get('/:id',
  checkAuth, (req, res, next) => {
  Experience.findById(req.params.id).then(experience => {
    if (experience) {
      res.status(200).json(experience);
    } else {
      res.status(404).json({message: 'Experience not found!'});
    }
  })
  .then(documents => {
    res.status(200).json({
      message: 'Awards fetched successfully!',
      experience: documents
    })
  })
});

router.put('/:id',
  checkAuth, (req, res, next) => {
  const experience = new Experience({
    companyName: req.body.companyName,
    jobTitle: req.body.jobTitle,
    jobStartDate:req.body.jobStartDate,
    jobEndDate: req.body.jobEndDate,
    description: req.body.description,
    _id: req.body.id
  });
  Experience.updateOne({_id: req.params.id, creator: req.userData.userId}, experience)
  .then( result => {
    if (result.n  > 0) {
      res.status(200).json({message: 'Update successful!'})
    } else {
      res.status(401).json({message: 'Not authorized!'})
    }
  })
});

router.delete('/:id',
  checkAuth, (req, res, next) => {
  Experience.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
   res.status(200).json({ message: "Experience deleted!" });
 });
});

module.exports = router;
