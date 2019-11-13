const express = require('express');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

const ObjectiveStatement = require('../models/objective');

router.post('',
  checkAuth, (req, res, next) => {
  const objective = new ObjectiveStatement ({
    statement: req.body.statement,
    creator: req.userData.userId
  });
  objective.save().then(createdObjective => {
    res.status(201).json({
      message: 'Objective added successfully.',
      objectiveId: createdObjective._id
    });
  });
});

router.get('',
  checkAuth, (req, res, next) => {
  ObjectiveStatement.find({creator:req.userData.userId})
  .then(document => {
    res.status(200).json({
      message: 'Objective fetched successfully!',
      objectiveStatement: document
    })
  })
});

router.put('/:id',
  checkAuth, (req, res, next) => {
  const objective = new ObjectiveStatement({
    statement: req.body.statement,
    _id: req.body.id
  })
  ObjectiveStatement.updateOne({_id: req.params.id, creator: req.userData.userId}, objective)
  .then( result => {
    if (result.n  > 0) {
      res.status(200).json({message: 'Update successful!'})
    } else {
      res.status(401).json({message: 'Not authorized!'})
    }
  })
});

module.exports = router;
