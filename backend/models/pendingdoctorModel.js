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
    dateOfBirth: {
        type: Date,
        required: true,
    },
    hourlyRate: {
        type: Number,
        required: true,
    },
    affiliation: {
        type: String,
        required: true,
    },
    educationalBackground: {
        type: String,
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor',
        required: false,

},})


module.exports = mongoose.model('pendingdoctorrequest', PendingDoctorRequestSchema);



