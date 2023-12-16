const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClinicConversationSchema = new Schema(
    {
        senderId: {
            type: Schema.Types.ObjectId,
        },
        receiverId: {
            type: Schema.Types.ObjectId,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('ClinicConversation', ClinicConversationSchema);