const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const prescriptionsSchema = new Schema({
    medicines: [
        {
          name: {
            type: String,
            required: true
          },
          dosage: {
            type: String,
            
          },
          quantity:{
            type: Number,
            default: 1
          },
          price: {
            type: Number,
            
          },
          
        }
      ],
      date: {
        type: Date,
        required: true
      },
      doctor: {
        type: String,
        required: true
      },
      filled: {
        type: Boolean,
        default: false
      },
      patientUsername: {
        type: String,
        required: true
      }
}, { timestamps: true });

module.exports = mongoose.model('Prescriptions', prescriptionsSchema);
