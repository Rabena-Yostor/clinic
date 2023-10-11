// models/appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: String,
  doctorName: String,
  date: Date,
  status: String, // e.g., 'scheduled', 'completed', 'canceled'
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
