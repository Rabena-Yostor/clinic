const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please add a username']
    },
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email']
    },
    password: {
        type: String,
        required: [true, 'Please create a password']
    },
    dateofbirth: {
        type: Date,
        required: [true, 'Please enter your date of birth']
    },
    hourlyrate: {
        type: Number,
        required: [true, 'Please add an hourly rate']
    },
    affiliation: {
        type: String,
        required: [true, 'Please add an affiliation (hospital)']
    },
    educationalbackground: {
        type: String,
        required: [true, 'Please add educational background']
    }
}, { timestamps: true });

module.exports = mongoose.model('doctor', doctorSchema);

