const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const prescriptionsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    grams: {
        type: Number,
        required: true
    },
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
        required: true
    },
    patientUsername: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Prescriptions', prescriptionsSchema);
