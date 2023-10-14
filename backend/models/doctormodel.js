const mongoose = require('mongoose')
const Schema = mongoose.Schema


const doctorSchema = new mongoose.Schema({
UserName: {
    type: String,
    required: true
},
Name: {
    type: String,
    required: true
},  
Email: {
    type: String,
    required: true
},
Password: {
    type: String,
    required: true
},
DateOfBirth: {
    type: String,
    required: true
},

HourlyRate: {
    type: Number,
    required: true
},
AffiliatedHospital: {
    type: String,
    required: true
},
Education: {
    type: String,
    required: true
},
Appointment:{
    type: Date,
    
},
Appointment_Status:{
    type:String,
    enum: ['upcoming', 'completed', 'cancelled','rescheduled'],
    
},
ArrayOfPatients: [{
    type: Schema.Types.ObjectId,
    ref: 'Patient', // This should be the model name for the patient schema
}],



}, {timestamps: true})

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;







