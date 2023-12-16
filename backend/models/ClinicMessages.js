const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClinicMessageSchema = new Schema(
    {
        text: {
            type: String,
        },
        conversationId: {
            type: Schema.Types.ObjectId,
            ref: 'ClinicConversation',
        },
        senderId: {
            type: Schema.Types.ObjectId,
        },
        senderName: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('ClinicMessage', ClinicMessageSchema);