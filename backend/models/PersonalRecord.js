import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let PersonalRecord = new Schema({
    contact: [
        {
            name: 
            {
                firstName: {
                    type: String
                },
                lastName: {
                    type: String
                },
             }
        },
        {
            currentAddress: {
                type: String
            },
        },
        {
            emailAddress: {
                type: String
            },
        },
        {
            phoneNumber: {
                type: String
            },
        }
    ],

    
    objectiveStatement: {
        type: String, default: 'none',
    },

    education: [{
            schoolName: {type: String, default: 'none'},
            startDate: {type: Date, default: Date.now},
            endDate: {type: Date, default: Date.now},
            major: String,
            relatedCourses: String
        },
        {
            schoolName: {type: String, default: 'none'},
            startDate: {type: Date, default: Date.now},
            endDate: {type: Date, default: Date.now},
            major: String,
            relatedCourses: String
    }],
    experience: [
        {
            jobTitle: {type: String, default: 'none'},
            company: String,
            location: String,
            startDate: {type: Date, default: Date.now},
            endDate: {type: Date, default: Date.now},
            description: String,
        },
        {
            jobTitle: {type: String, default: 'none'},
            company: String,
            location: String,
            startDate: {type: Date, default: Date.now},
            endDate: {type: Date, default: Date.now},
            description: String,
        }
    ],
    projects: [
        {
            title: {type: String, default: 'none'},
            startDate: {type: Date, default: Date.now},
            endDate: {type: Date, default: Date.now},
            description: String,
        },
        {
            title: {type: String, default: 'none'},
            startDate: {type: Date, default: Date.now},
            endDate: {type: Date, default: Date.now},
            description: String,
        }
    ],
    awards: [
        {
            title: {type: String, default: 'none'},
            date: String,
            description: String,
        },
        {
            title: {type: String, default: 'none'},
            date: String,
            description: String,
        },
        {
            title: {type: String, default: 'none'},
            date: String,
            description: String,
        }
    ],
    skills: [
        {
            programmingLanguages: [
                {
                    name: {type:String, default: 'none'},
                },
                {
                    name: {type:String, default: 'none'},
                },
                {
                    name: {type:String, default: 'none'},
                },
                {
                    name: {type:String, default: 'none'},
                },
                {
                    name: {type:String, default: 'none'},
                },
            ],
            other: [
                {
                    name: {type:String, default: 'none'},
                },
                {
                    name: {type:String, default: 'none'},
                },
                {
                    name: {type:String, default: 'none'},
                },
                {
                    name: {type:String, default: 'none'},
                },
                {
                    name: {type:String, default: 'none'},
                },
            ]
        }
    ]
});

export default mongoose.model('PersonalRecord', PersonalRecord);