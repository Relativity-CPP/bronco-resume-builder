const express = require('express');
const bodyParser = require ('body-parser');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.post('api/contact-info', (req, res, next) => {
  const contactInfo = req.body;
  console.log(contactInfo);
  res.status(201).json({
    message: 'Contact info added successfully.',
  });
});

app.use('/api/contact-info', (req, res, next) => {
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
