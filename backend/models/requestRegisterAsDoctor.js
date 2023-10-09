const mongoose = require('mongoose')
const Schema = mongoose.Schema


const request_register_as_doctor = new mongoose.Schema({
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



}, {timestamps: true})



module.exports = mongoose.model('request_register_as_doctor', request_register_as_doctor) 



