import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import PersonalRecord from './models/PersonalRecord';
import { runInNewContext } from 'vm';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

// Need to establish a connection to the database server
mongoose.connect('mongodb+srv://aaronL:mongod523614@cluster0-kxg8w.mongodb.net/test?retryWrites=true&w=majority/BroncoResumeInfo');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

router.route('/personalrecords').get((req, res) => {
    PersonalRecord.find((err, personalrecords) => {
        if (err)
            console.log(err);
        else
            res.json(personalrecords);
    });
});

router.route('/personalrecords/:id').get((req, res) => {
    PersonalRecord.findById(req.params.id, (err, personalrecord) => {
        if (err)
            console.log(err);
        else
            res.json(personalrecord);
    });
});

router.route('/personalrecords/add').post((req, res) => {
    let personalrecord = new PersonalRecord(req.body);
    personalrecord.save()
        .then(personalrecord => {
            res.status(200).json({'personalrecord': 'Added successfully'});
        })
        .catch(err=> {
            res.status(400).send('Failed to create a new record');
        });
});

router.route('/personalrecords/update/:id').post((req, res) => {
    PersonalRecord.findById(req.params.id), (err, personalrecord) => {
        if (!personalrecord)
            return next(new Error('Could not load document'));
        else {
            personalrecord.contact = req.body.contact;
            personalrecord.objectiveStatement = req.body.objectiveStatement;
            personalrecord.education = req.body.education;
            personalrecord.experience = req.body.experience;
            personalrecord.projects = req.body.projects;
            personalrecord.awards = req.body.awards;
            personalrecord.skills = req.body.skills;

            personalrecord.save.then(personalrecord => {
                res.json('Update complete');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    }
});

router.route('/personalrecords/delete/:id').get((req, res) => {
    PersonalRecord.findByIdAndRemove({_id: req.params.id}, (err, personalrecord) => {
        if (err)
            res.json(err);
        else   
            res.json('Removal successful');
    })
})

app.use('/', router);

app.listen(4000, () => console.log('Express server running on port 4000'));

