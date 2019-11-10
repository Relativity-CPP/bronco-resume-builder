const express = require('express');

const router = express.Router();

const Award = require('../models/award');

router.post('', (req, res, next) => {
  const award = new Award({
    title: req.body.title,
    date: req.body.date,
    description: req.body.description
  });
  award.save().then(createdAward => {
    res.status(201).json({
      message: 'Award added successfully.',
      awardId: createdAward._id
    });
  });
});

router.get('', (req, res, next) => {
  Award.find()
  .then(documents => {
    res.status(200).json({
      message: 'Awards fetched successfully!',
      awards: documents
    })
  })
});
router.get('/:id', (req, res, next) => {
  Award.findById(req.params.id).then(award => {
    if (award) {
      res.status(200).json(award);
    } else {
      res.status(404).json({message: 'Award not found!'});
    }
  })
  .then(documents => {
    res.status(200).json({
      message: 'Awards fetched successfully!',
      awards: documents
    })
  })
});
router.put('/:id', (req, res, next) => {
  const award = new Award({
    title: req.body.title,
    date: req.body.date,
    description: req.body.description,
    _id: req.body.id
  })
  Award.updateOne({_id: req.params.id}, award)
    .then(result => {
      console.log(result);
      res.status(200).json({message: "Award update successful!"})
    })
});
router.delete('/:id', (req, res, next) => {
  Award.deleteOne({ _id: req.params.id }).then(result => {
   console.log(result);
   res.status(200).json({ message: "Award deleted!" });
  });
});

module.exports = router;
