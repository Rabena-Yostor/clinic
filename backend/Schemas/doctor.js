const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true
  },
  DoctorID: {
    type: Number,
    required: true,
  },
  HourlyRate: {
    type: Number,
    required: true,
  },
  Affiliation: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;