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
