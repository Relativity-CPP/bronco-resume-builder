const express = require('express');

const router = express.Router();

const Project = require('../models/project');

router.post('', (req, res, next) => {
  const project = new Project({
    title: req.body.title,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    description: req.body.description
  });
  project.save().then(createdProject => {
    res.status(201).json({
      message: 'Project added successfully.',
      projectId: createdProject._id
    });
  });
});

router.get('', (req, res, next) => {
  Project.find()
  .then(documents => {
    res.status(200).json({
      message: 'Projects fetched successfully!',
      project: documents
    })
  })
});

router.delete('/:id', (req, res, next) => {
  Project.deleteOne({ _id: req.params.id }).then(result => {
   console.log(result);
   res.status(200).json({ message: "Project deleted!" });
  });
});


module.exports = router;
