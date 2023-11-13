const mongoose = require('mongoose');

const healthPackageSubscription= new mongoose.Schema({
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
    familyMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient', // Reference to the Patient model for family members
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['wallet', 'credit card'], // Payment method can be either 'wallet' or 'credit card'
        required: true,
    },
    accountNumber: {
        type: String, // Add the accountNumber field as a string type
        required: function() {
            return this.paymentMethod === 'credit card'; // Require accountNumber if payment method is credit card
        },
    },
    status: {
        type: String,
        enum: ['active', 'cancelled'], // Subscription status can be 'active' or 'cancelled'
        required: true,
        default: 'active', // Default status is 'active'
    },
    cancellationDate: {
        type: Date,
    },
    subscriptionDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('HealthPackageSubscription', healthPackageSubscription);

