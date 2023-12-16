const ClinicConversation = require('../models/ClinicConversation');
const ClinicMessage = require('../models/ClinicMessages');
const Patient = require('../models/PatientModel');
const Doctor = require('../models/doctorModel');

const getConversationPatient = async (req, res) => {
    try {
        const { senderName, recieverName } = req.body;
        if (!senderName || !recieverName) {
            return res.status(400).json({ message: 'Please enter senderName and recieverName' });
        }
        const patient = await Patient.findOne({ username: senderName });
        const doctor = await Doctor.findOne({ username: recieverName });
        if (!patient || !doctor) {
            return res.status(400).json({ message: 'Patient or Doctor does not exist' });
        }
        const conversation = await ClinicConversation.findOne({senderId: patient._id, receiverId: doctor._id});
        const conversation2 = await ClinicConversation.findOne({senderId: doctor._id, receiverId: patient._id});
        if(!conversation && !conversation2){
            const newConversation = new ClinicConversation({
                senderId: patient._id,
                receiverId: doctor._id,
            });
            await newConversation.save();
            return res.status(200).json({message: 'No conversation was found. A new one was created successfully', conversation: newConversation , conversationId: newConversation._id });
        }
        if(conversation){
            const messages = await ClinicMessage.find({ conversationId: conversation._id });
            return res.status(200).json({ conversation, messages , conversationId: conversation._id });
        }
        if(conversation2){
            const messages = await ClinicMessage.find({ conversationId: conversation2._id });
            return res.status(200).json({ conversation: conversation2, messages , conversationId: conversation2._id });
        }
    }
    catch (err) {
        console.error('Error retrieving conversation:', error);
        return res.status(500).json({ message: 'Error retrieving conversation' });
    }
}

const getConversationDoctor = async (req, res) => {
    try {
        const { senderName, recieverName } = req.body;
        if (!senderName || !recieverName) {
            return res.status(400).json({ message: 'Please enter senderName and recieverName' });
        }
        const patient = await Patient.findOne({ username: recieverName });
        const doctor = await Doctor.findOne({ username: senderName });
        if (!patient || !doctor) {
            return res.status(400).json({ message: 'Patient or Doctor does not exist' });
        }
        const conversation = await ClinicConversation.findOne({senderId: patient._id, receiverId: doctor._id});
        const conversation2 = await ClinicConversation.findOne({senderId: doctor._id, receiverId: patient._id});
        if(!conversation && !conversation2){
            const newConversation = new ClinicConversation({
                senderId: doctor._id,
                receiverId: patient._id,
            });
            await newConversation.save();
            return res.status(200).json({message: 'No conversation was found. A new one was created successfully', conversation: newConversation , conversationId: newConversation._id });
        }
        if(conversation){
            const messages = await ClinicMessage.find({ conversationId: conversation._id });
            return res.status(200).json({ conversation, messages , conversationId: conversation._id });
        }
        if(conversation2){
            const messages = await ClinicMessage.find({ conversationId: conversation2._id });
            return res.status(200).json({ conversation: conversation2, messages  , conversationId: conversation2._id});
        }
    }
    catch (err) {
        console.error('Error retrieving conversation:', error);
        return res.status(500).json({ message: 'Error retrieving conversation' });
    }
}

const sendMessagePatient = async (req, res) => {
   try{
    const { conversationId, senderName, text } = req.body;
    if (!conversationId || !senderName || !text) {
        return res.status(400).json({ message: 'Please enter conversationId, senderName and text' });
    }
    const patient = await Patient.findOne({ username: senderName });
    if(!patient){
        return res.status(400).json({ message: 'Patient does not exist' });
    }
    const conversation = await ClinicConversation.findOne({ _id: conversationId });
    if(!conversation){
        return res.status(400).json({ message: 'Conversation does not exist' });
    }
    const newMessage = new ClinicMessage({
        conversationId,
        senderId: patient._id,
        senderName,
        text,
    });
    await newMessage.save();
    return res.status(200).json({ message: 'Message sent successfully', newMessage });
   }
    catch (err) {
     console.error('Error sending message:', error);
     return res.status(500).json({ message: 'Error sending message' });
    }
}

const sendMessageDoctor = async (req, res) => {
    try{
     const { conversationId, senderName, text } = req.body;
     if (!conversationId || !senderName || !text) {
         return res.status(400).json({ message: 'Please enter conversationId, senderName and text' });
     }
     const doctor = await Doctor.findOne({ username: senderName });
     if(!doctor){
         return res.status(400).json({ message: 'Doctor does not exist' });
     }
     const conversation = await ClinicConversation.findOne({ _id: conversationId });
     if(!conversation){
         return res.status(400).json({ message: 'Conversation does not exist' });
     }
     const newMessage = new ClinicMessage({
         conversationId,
         senderId: doctor._id,
         senderName,
         text,
     });
     await newMessage.save();
     return res.status(200).json({ message: 'Message sent successfully', newMessage });
    }
     catch (err) {
      console.error('Error sending message:', error);
      return res.status(500).json({ message: 'Error sending message' });
     }
 }
 
module.exports = { getConversationPatient, getConversationDoctor , sendMessagePatient , sendMessageDoctor};

