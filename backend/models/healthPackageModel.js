const mongoose = require('mongoose');

const healthPackageSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['silver', 'gold', 'platinum']
    },
    price: {
        type: Number,
        required: true
    },
    doctorSessionDiscount: {
        type: Number,
        required: true
    },
    medicineDiscount: {
        type: Number,
        required: true
    },
    familySubscriptionDiscount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('HealthPackage', healthPackageSchema);
