const mongoose =require('mongoose')
const Schema = mongoose.Schema

const patientSchema = new Schema({
    username:{
        type: String,
        required: [true , 'please add a username']
    },
    name:{
        type: String,
        required: [true , 'please add a name']
    },
    email:{
        type: String,
        required:[true , 'please add an email']
    },
    password:{
        type: String,
        required: [true , 'please create a password']
    },
    dateofbirth: {
        type: Date,
        required: [true, 'Please enter your date of birth']
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'non-binary'],
        required: [true, 'Please select a gender']
    },
    mobilenumber:{
        type: Number,
        required: [true , 'please add a mobile number']
    },
    
    emergencyfullname: {
        type: String,
        required: [false , 'please add a name']
    },
    emergencynumber: {
        type: Number,
        required: [false , 'please add a mobile number']
    }
   

}, {timestamps: true })



module.exports = mongoose.model('patient', patientSchema)