const express = require('express');

const router = express.Router();

const Education = require('../models/education');

router.post('', (req, res, next) => {
  const education = new Education({
    schoolName: req.body.schoolName,
    degreeType: req.body.degreeType,
    major: req.body.major,
    schoolStartDate: req.body.schoolStartDate,
    schoolEndDate: req.body.schoolEndDate,
    gpa: req.body.gpa
  });
  education.save().then(createdEducation => {
    res.status(201).json({
      message: 'Education added successfully.',
      educationId: createdEducation._id
    });
  });
});

router.get('', (req, res, next) => {
  Education.find()
  .then(documents => {
    res.status(200).json({
      message: 'Education fetched successfully!',
      education: documents
    })
  })
});

router.delete('/:id', (req, res, next) => {
  Education.deleteOne({ _id: req.params.id }).then(result => {
   console.log(result);
   res.status(200).json({ message: "Education deleted!" });
 });
});

module.exports = router;
