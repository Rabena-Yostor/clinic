const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient', // Reference to the Patient model
        required: true,
    },
    healthPackage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HealthPackage', // Reference to the HealthPackage model
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['wallet', 'credit card'], // Payment method can be either 'wallet' or 'credit card'
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'], // Payment status can be 'pending', 'completed', or 'failed'
        required: true,
        default: 'pending', // Default status is 'pending'
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Payment', paymentSchema);
