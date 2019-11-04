// import express, bodyParser, mongoose
const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');

const ContactInfo = require('./models/contact-info');
const ObjectiveStatement = require('./models/objective');
const Award = require('./models/awards');
const Education = require('./models/education');
const Experience = require('./models/experience');
const Project = require ('./models/project');
const Skill = require('./models/skill');

const UserRoutes = require('./routes/user');

const app = express();

// connect to mongoDB
mongoose.connect('mongodb+srv://aaronL:doXbB996gyUniohb@cluster0-kxg8w.mongodb.net/bronco-resume-info')
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


//HTTP post apis
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
      educationId: createdEducation._id
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
  experience.save().then(createdExperience => {
    res.status(201).json({
      message: 'Experience added successfully.',
      experienceId: createdExperience._id
    });
  });
});
app.post('/api/objective', (req, res, next) => {
  const objective = new ObjectiveStatement({
    statement: req.body.statement
  });
  objective.save().then(createdObjective => {
    res.status(201).json({
      message: 'Objective added successfully.',
      objectiveId: createdObjective._id
    });
  });
});
app.post('/api/projects', (req, res, next) => {
  const project = new Project({
    title: req.body.title,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    description: req.body.description
  });
  project.save().then(createdProject => {
    res.status(201).json({
      message: 'Project added successfully.',
      projectId: createdProject._id
    });
  });
});
app.post('/api/skills', (req, res, next) => {
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

// HTTP get apis
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
app.get("/api/experience", (req, res, next) => {
  Experience.find()
  .then(documents => {
    res.status(200).json({
      message: 'Experience fetched successfully!',
      experience: documents
    })
  })
});
app.get("/api/projects", (req, res, next) => {
  Project.find()
  .then(documents => {
    res.status(200).json({
      message: 'Projects fetched successfully!',
      project: documents
    })
  })
});
app.get("/api/skills", (req, res, next) => {
  Skill.find()
  .then(documents => {
    res.status(200).json({
      message: 'Skills fetched successfully!',
      skill: documents
    })
  })
});
// app.get("/api/user", (req, res, next) => {
//   UserRoutes.find()
//     .then(documents => {
//       res.status(200).json({
//         message: 'User fetched successfully!',
//         user: documents
//       })
//     })
// });
//HTTP delete apis
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
app.delete("/api/experience/:id", (req, res, next) => {
  Experience.deleteOne({ _id: req.params.id }).then(result => {
   console.log(result);
   res.status(200).json({ message: "Experience deleted!" });
 });
});
app.delete("/api/projects/:id", (req, res, next) => {
  Skill.deleteOne({ _id: req.params.id }).then(result => {
   console.log(result);
   res.status(200).json({ message: "Skill deleted!" });
 });
});
app.delete("/api/skills/:id", (req, res, next) => {
  Skill.deleteOne({ _id: req.params.id }).then(result => {
   console.log(result);
   res.status(200).json({ message: "Skill deleted!" });
 });
});
app.use('/api.user', UserRoutes);
module.exports = app;
