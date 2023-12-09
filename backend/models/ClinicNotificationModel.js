
const mongoose = require('mongoose');

const clinicnotificationSchema = new mongoose.Schema({
  recipient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pharmacists', // Assuming you have a 'Pharmacist' model
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['unread', 'read'],
    default: 'unread',
  },
});

const NotificationClinic = mongoose.model('ClinicNotification', clinicnotificationSchema);

module.exports = NotificationClinic;
