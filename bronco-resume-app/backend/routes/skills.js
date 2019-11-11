const express = require('express');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

const Skill = require('../models/skill');

router.post('',
  checkAuth, (req, res, next) => {
  const skill = new Skill({
    description: req.body.description,
    creator: req.userData.userId
  });
  skill.save().then(createdSkill => {
    res.status(201).json({
      message: 'Skill added successfully.',
      skillId: createdSkill._id
    });
  });
});

router.get('',
  checkAuth, (req, res, next) => {
  Skill.find({creator: req.userData.userId})
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
