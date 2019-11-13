const express = require('express');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

const Project = require('../models/project');

router.post('',
  checkAuth, (req, res, next) => {
  const project = new Project({
    title: req.body.title,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    description: req.body.description,
    creator: req.userData.userId
  });
  project.save().then(createdProject => {
    res.status(201).json({
      message: 'Project added successfully.',
      projectId: createdProject._id
    });
  });
});

router.get('',
  checkAuth, (req, res, next) => {
  Project.find({creator: req.userData.userId})
  .then(documents => {
    res.status(200).json({
      message: 'Projects fetched successfully!',
      project: documents
    })
  })
});

router.get('/:id',
  checkAuth, (req, res, next) => {
  Project.findById(req.params.id).then(project => {
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({message: 'Award not found!'});
    }
  })
  .then(documents => {
    res.status(200).json({
      message: 'Project fetched successfully!',
      project: documents
    })
  })
});

router.put('/:id',
  checkAuth, (req, res, next) => {
  const project = new Project({
    title: req.body.title,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    description: req.body.description,
    _id: req.body.id
  });
  Project.updateOne({_id: req.params.id, creator: req.userData.userId}, project)
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
  Project.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
   res.status(200).json({ message: "Project deleted!" });
  });
});


module.exports = router;
