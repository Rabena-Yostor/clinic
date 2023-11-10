const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PendingDoctorRequestSchema = new Schema({  
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    dateofbirth: {
        type: Date,
        required: true,
    },
    hourlyrate: {
        type: Number,
        required: true,
    },
    affiliation: {
        type: String,
        required: true,
    },
    educationalbackground: {
        type: String,
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor',
    },
    idFile: {
        data: Buffer,
        contentType: String,
    },
    degreeFile: {
        data: Buffer,
        contentType: String,
    },
    licenseFile: {
        data: Buffer,
        contentType: String,
    },
})


module.exports = mongoose.model('pendingdoctorrequest', PendingDoctorRequestSchema);



