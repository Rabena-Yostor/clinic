// models/HealthRecordModel.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const healthRecordSchema = new Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  // Add fields specific to a health record
  bloodPressure: {
    type: String,
    required: true,
  },
  heartRate: {
    type: Number,
    required: true,
  },
  allergies: {
    type: String,
  },
  medications: {
    type: String,
  },
  // Add more fields as needed
}, { timestamps: true });

module.exports = mongoose.model('HealthRecord', healthRecordSchema);
