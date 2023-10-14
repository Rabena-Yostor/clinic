const mongoose = require('mongoose')

const Schema = mongoose.Schema

const patientSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    dateOfBirth:{
        type: Date,
        required:true
    },
    gender:{
        type: String,
        required: true
    },
    mobileNumber:{
        type: String,
        required: true
    },
    EmergencyContactName:{
        type: String,
        required: true
    },
    EmergencyContactNo:{
        type: String,
        required: true
    },
    Appointment:{
        type: Date,
        
    },
    Appointment_Status:{
        type:String,
        enum: ['upcoming', 'completed', 'cancelled','rescheduled'],
        
    }
},{timestamps: true})

module.exports  = mongoose.model('Patient', patientSchema)