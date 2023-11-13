const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const doctorSchema = new Schema(
  {
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
    },
    password: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
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
    speciality: {
      type: String,

    },
    educationalBackground: {
      type: String,
      required: true,
    },
    availableAppointment: {
      type: Date,
    },

    Appointments: [{
      type: Date,
    }],


    Appointment_Status: {
      type: String,
      enum: ['upcoming', 'completed', 'cancelled', 'rescheduled'],

    },
    ArrayOfPatients: [{
      type: Schema.Types.ObjectId,
      ref: 'Patient', // This should be the model name for the patient schema
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
