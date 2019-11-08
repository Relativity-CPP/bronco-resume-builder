const express = require('express');

const router = express.Router();

const Skill = require('../models/skill');

router.post('', (req, res, next) => {
  const skill = new Skill({
    description: req.body.description
  });
  skill.save().then(createdSkill => {
    res.status(201).json({
      message: 'Skill added successfully.',
      skillId: createdSkill._id
    });
  });
});

router.get('', (req, res, next) => {
  Skill.find()
  .then(documents => {
    res.status(200).json({
      message: 'Skills fetched successfully!',
      skill: documents
    })
  })
});

router.delete('/:id', (req, res, next) => {
  Skill.deleteOne({ _id: req.params.id }).then(result => {
   console.log(result);
   res.status(200).json({ message: "Skill deleted!" });
  });
});

module.exports = router;
