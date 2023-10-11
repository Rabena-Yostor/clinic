// models/appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({

  appdate:{
    type:Date,
    required: true
  } ,
  appstatus:{
    type:String, 
    enum:['scheduled', 'completed', 'canceled'] ,
    required: true

  } 
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
