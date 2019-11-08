const express = require('express');

const router = express.Router();

const ObjectiveStatement = require('../models/objective');

router.post('', (req, res, next) => {
  const objective = new ObjectiveStatement ({
    statement: req.body.statement
  });
  objective.save().then(createdObjective => {
    res.status(201).json({
      message: 'Objective added successfully.',
      objectiveId: createdObjective._id
    });
  });
});

router.get('', (req, res, next) => {
  const objectiveStatement = {
    id: 'test123',
    statement: 'I wanna be awesome'
  };
  res.status(200).json({
    message: 'Objective fetched successfully!',
    objectiveStatement: objectiveStatement
  });
});

module.exports = router;
