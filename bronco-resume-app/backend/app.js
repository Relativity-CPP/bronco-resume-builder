// import express, bodyParser, mongoose
const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');

const awardsRoutes = require('./routes/awards')
const contactInfoRoutes = require('./routes/contact-info');
const educationRoutes = require('./routes/education');
const experienceRoutes = require('./routes/experience');
const objectiveRoutes = require('./routes/objective');
const projectsRoutes = require ('./routes/projects');
const skillsRoutes = require('./routes/skills');
const userRoutes = require('./routes/user');


const app = express();

// connect to mongoDB
mongoose.connect(
  "mongodb+srv://aaronL:" +
  process.env.MONGO_ATLAS_PW +
  "@cluster0-kxg8w.mongodb.net/bronco-resume-info")
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
     console.log('Connection failed!');
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use('/api/awards', awardsRoutes);
app.use('/api/contact-info', contactInfoRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/objective', objectiveRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
