const express = require('express');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

const Award = require('../models/award');

router.post('',
checkAuth, (req, res, next) => {
  const award = new Award({
    title: req.body.title,
    date: req.body.date,
    description: req.body.description,
    creator: req.userData.userId
  });
  award.save().then(createdAward => {
    res.status(201).json({
      message: 'Award added successfully.',
      awardId: createdAward._id
    });
  });
});

router.get('',
  checkAuth, (req, res, next) => {
  Award.find({creator: req.userData.userId})
  .then(documents => {
    res.status(200).json({
      message: 'Awards fetched successfully!',
      awards: documents
    })
  })
});

router.get('/:id',
  checkAuth, (req, res, next) => {
  Award.findById(req.params.id).then(award => {
    if (award) {
      res.status(200).json(award);
    } else {
      res.status(404).json({message: 'Award not found!'});
    }
  })
  .then(documents => {
    res.status(200).json({
      message: 'Award fetched successfully!',
      awards: documents
    })
  })
});

router.put('/:id',
  checkAuth, (req, res, next) => {
  const award = new Award({
    title: req.body.title,
    date: req.body.date,
    description: req.body.description,
    _id: req.body.id
  });
  Award.updateOne({_id: req.params.id, creator: req.userData.userId}, award)
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
  Award.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
   res.status(200).json({ message: "Award deleted!" });
  });
});

module.exports = router;
