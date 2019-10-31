// import express, bodyParser, mongoose
const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');

const ContactInfo = require('./models/contact-info');

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
  const awards = new Awards({
    title: req.body.title,
    date: req.body.date,
    description: req.body.description
  });
  awards.save();
  console.log(awards);
  res.status(201).json({
    message: 'Awards added successfully.',
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
  contactInfo.save();
  console.log(contactInfo);
  res.status(201).json({
    message: 'Contact info added successfully.',
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
  education.save();
  console.log(education);
  res.status(201).json({
    message: 'education added successfully.',
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
  const objective = new Objective({
    statement: req.body.statement
  });
  objective.save();
  console.log(objective);
  res.status(201).json({
    message: 'objective added successfully.',
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
  const contactInfo = {
    id: 'test123',
    firstName: 'First Name',
    lastName: 'Last Name',
    homeAddress: '123 Oak Street',
    phoneNumber: '(909) 911-9111',
    emailAddress: 'hotsingles@gmail.com',
    socialMediaLink: 'veryprofessional@linkedin.com',
  };
  res.status(200).json({
    message: 'Contact info fetched successfully!',
    contactInfo: contactInfo
  });
});

module.exports = app;
