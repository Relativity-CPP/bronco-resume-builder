const express = require('express');

const router = express.Router();

const Experience = require('../models/experience');

router.get('', (req, res, next) => {
  Experience.find()
  .then(documents => {
    res.status(200).json({
      message: 'Experience fetched successfully!',
      experience: documents
    })
  })
});

router.post('', (req, res, next) => {
  const experience = new Experience({
    companyName: req.body.companyName,
    jobTitle: req.body.jobTitle,
    jobStartDate:req.body.jobStartDate,
    jobEndDate: req.body.jobEndDate,
    description: req.body.description,
  });
  experience.save().then(createdExperience => {
    res.status(201).json({
      message: 'Experience added successfully.',
      experienceId: createdExperience._id
    });
  });
});

router.delete('/:id', (req, res, next) => {
  Experience.deleteOne({ _id: req.params.id }).then(result => {
   console.log(result);
   res.status(200).json({ message: "Experience deleted!" });
 });
});

module.exports = router;
