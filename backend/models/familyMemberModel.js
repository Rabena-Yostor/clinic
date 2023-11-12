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
        ref: 'Patient' 
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient' 
    }

}, { timestamps: true });

module.exports = mongoose.model('familyMemberSchema', familyMemberSchema);
