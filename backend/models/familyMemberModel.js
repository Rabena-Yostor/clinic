const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const familyMemberSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    National_id: {
        type: Number,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    relation: {
        type: String,
        required: true,
        enum: ['WIFE', 'HUSBAND', 'CHILDREN']
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient' // Update to 'Patient' with capital 'P' if that's the name of your patient model
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient' 
    }
}, { timestamps: true });

module.exports = mongoose.model('familyMemberSchema', familyMemberSchema);
