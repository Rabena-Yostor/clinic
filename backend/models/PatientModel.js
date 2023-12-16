const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
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
        
    },
    WalletAmount:{
        type:Number,
        default: 0,

    },
    appointments: [
        {
          date: { type: Date },
          status: {
            type: String,
            enum: ["upcoming", "completed", "cancelled", "rescheduled",""],
          },
          doctorUsername: { type: String },
        },
      ],
      medicalHistoryFiles: [
        {
            medicalHistoryFileData: {
                type: Buffer,
            },
        },
    ],
},{timestamps: true})

patientSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };
  patientSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
  });

module.exports  = mongoose.model('Patient', patientSchema)
