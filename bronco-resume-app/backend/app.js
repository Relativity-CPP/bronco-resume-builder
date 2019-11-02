// import express, bodyParser, mongoose
const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');

const ContactInfo = require('./models/contact-info');
const ObjectiveStatement = require('./models/objective');
const Award = require('./models/awards');
const Education = require('./models/education');

const app = express();

// connect to mongoDB
mongoose.connect('mongodb+srv://aaronL:doXbB996gyUniohb@cluster0-kxg8w.mongodb.net/bronco-resume-info?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
     console.log('Connection failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post('/api/awards', (req, res, next) => {
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

app.post('/api/contact-info', (req, res, next) => {
  const contactInfo = new ContactInfo({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    homeAddress: req.body.homeAddress,
    phoneNumber: req.body.phoneNumber,
    emailAddress: req.body.emailAddress,
    socialMediaLink: req.body.socialMediaLink
  });
  contactInfo.save().then(createdContactInfo => {
    res.status(201).json({
      message: 'Contact Info added successfully.',
      contactInfoId: createdContactInfo._id
    });
  });
});
//post method for education
app.post('/api/education', (req, res, next) => {
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
      contactInfoId: createdContactInfo._id
    });
  });
});
app.post('/api/experience', (req, res, next) => {
  const experience = new Experience({
    companyName: req.body.companyName,
    jobTitle: req.body.jobTitle,
    jobStartDate:req.body.jobStartDate,
    jobEndDate: req.body.jobEndDate,
    description: req.body.description,
  });
  experience.save();
  console.log(experience);
  res.status(201).json({
    message: 'experience added successfully.',
  });
});
app.post('/api/objective', (req, res, next) => {
  const objective = new ObjectiveStatement({
    statement: req.body.statement
  });
  objective.save();
  console.log(objective);
  res.status(201).json({
    message: 'Objective added successfully.',
  });
});

//post method for projects
app.post('/api/projects', (req, res, next) => {
  const projects = new Projects({
    title: req.body.title,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    description: req.body.description
  });
  projects.save();
  console.log(projects);
  res.status(201).json({
    message: 'projects added successfully.',
  });
});
//post method for skills
app.post('/api/skills', (req, res, next) => {
  const skills = new Skills({
    description: req.body.description
  });
  skills.save();
  console.log(skills);
  res.status(201).json({
    message: 'skills added successfully.',
  });
});
app.get('/api/contact-info', (req, res, next) => {
  ContactInfo.findById("5dbcb8c170ebbe6a13c25a40")
  .then(document => {
    res.status(200).json({
      message: 'ContactInfo fetched successfully!',
      contactInfo: document
    })
  })
});

app.get('/api/objective', (req, res, next) => {
  const objectiveStatement = {
    id: 'test123',
    statement: 'I wanna be awesome'
  };
  res.status(200).json({
    message: 'Objective fetched successfully!',
    objectiveStatement: objectiveStatement
  });
});

app.get("/api/awards", (req, res, next) => {
  Award.find()
  .then(documents => {
    res.status(200).json({
      message: 'Awards fetched successfully!',
      awards: documents
    })
  })
});
app.get("/api/education", (req, res, next) => {
  Education.find()
  .then(documents => {
    res.status(200).json({
      message: 'Education fetched successfully!',
      education: documents
    })
  })
});

app.delete("/api/awards/:id", (req, res, next) => {
   Award.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Award deleted!" });
  });
});
app.delete("/api/education/:id", (req, res, next) => {
  Education.deleteOne({ _id: req.params.id }).then(result => {
   console.log(result);
   res.status(200).json({ message: "Education deleted!" });
 });
});

module.exports = app;
