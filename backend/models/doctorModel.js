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
    Appointment_Status: {
      type: String,
      enum: ['upcoming', 'completed', 'cancelled', 'rescheduled'],

    },
    ArrayOfPatients: [{
      type: Schema.Types.ObjectId,
      ref: 'Patient', // This should be the model name for the patient schema
    }],
    WalletAmount:{
      type:Number,
      default: 0,

  },
  appointments: [
    {
      date: { type: Date },
      status: {
        type: String,
        enum: ["upcoming", "completed", "cancelled", "rescheduled"],
      },
    },
  ],
  idFile: {
    data: Buffer,
    contentType: String,
},
degreeFile: {
    data: Buffer,
    contentType: String,
},
licenseFile: {
    data: Buffer,
    contentType: String,
},

  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
