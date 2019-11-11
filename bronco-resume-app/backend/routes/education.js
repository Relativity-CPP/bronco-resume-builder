const express = require('express');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

const Education = require('../models/education');

router.post('',
  checkAuth, (req, res, next) => {
  const education = new Education({
    schoolName: req.body.schoolName,
    degreeType: req.body.degreeType,
    major: req.body.major,
    schoolStartDate: req.body.schoolStartDate,
    schoolEndDate: req.body.schoolEndDate,
    gpa: req.body.gpa,
    creator: req.userData.userId
  });
  education.save().then(createdEducation => {
    res.status(201).json({
      message: 'Education added successfully.',
      educationId: createdEducation._id
    });
  });
});

router.get('',
  checkAuth, (req, res, next) => {
  Education.find({creator: req.userData.userId})
  .then(documents => {
    res.status(200).json({
      message: 'Education fetched successfully!',
      education: documents
    })
  })
});

router.get('/:id',
  checkAuth, (req, res, next) => {
  Education.findById(req.params.id).then(education => {
    if (education) {
      res.status(200).json(education);
    } else {
      res.status(404).json({message: 'Education not found!'});
    }
  })
  .then(documents => {
    res.status(200).json({
      message: 'Education fetched successfully!',
      education: documents
    })
  })
});

router.put('/:id',
  checkAuth, (req, res, next) => {
  const education = new Education({
    schoolName: req.body.schoolName,
    degreeType: req.body.degreeType,
    major: req.body.major,
    schoolStartDate: req.body.schoolStartDate,
    schoolEndDate: req.body.schoolEndDate,
    gpa: req.body.gpa,
    _id: req.body.id
  });
  Education.updateOne({_id: req.params.id, creator: req.userData.userId}, education)
    .then(result => {
      res.status(200).json({message: "Education update successful!"})
    })
});

router.delete('/:id',
  checkAuth, (req, res, next) => {
  Education.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
  res.status(200).json({ message: "Education deleted!" });
 });
});

module.exports = router;
