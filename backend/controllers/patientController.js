const { mongo, default: mongoose } = require('mongoose')
const patient = require('../models/PatientModel')

// get all patients
const getAllPatients = async(req,res)=>{
    const patients = await patient.find({})
    res.status(200).json(patients)
}

// get a specific patient(Search for one)
const getPatient = async(req,res)=>{
    const {id} = req.params
    const { name } = req.query;
    const specificPatient = await patient.find({ name: { $regex: new RegExp(name, 'i') } })

    if(!patient){
        return res.status(404).json({error:'No Patient'})
    }
    res.status(200).json(specificPatient)

}

// create a patient
const createPatient = async (req, res) => {
    const { username, name, email, password, dateOfBirth, gender, mobileNumber, EmergencyContactName, EmergencyContactNo,Appointment } = req.body
    try {
        const newPatient = await patient.create({ username, name, email, password, dateOfBirth, gender, mobileNumber, EmergencyContactName, EmergencyContactNo,Appointment })
        res.status(200).json(newPatient)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete a patient
const deletePatient = async (req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ error: 'No Patient' })
    }
    const deletePatient = await patient.findOneAndDelete({_id: id})
    
    if(!deletePatient){
        return res.status(400).json({ error: 'No Patient' })
    }

    res.status(200).json(deletePatient)
}

//update patient info
const updatePatient = async (req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ error: 'No Patient' })
    }
    const updatePatient = await patient.findOneAndUpdate({_id: id},{
        ...req.body
    })
    if(!updatePatient){
        return res.status(400).json({ error: 'No Patient' })
    }

    res.status(200).json(updatePatient)
}

// Get patients with upcoming appointments
const filterAppointment = async (req, res) => {
    try {
        const currentDate = new Date();
    
        // Regular expression pattern for a date in the future (YYYY-MM-DDTHH:mm:ss.SSSZ)
        const futureDatePattern = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;
    
        const futureAppointments = await patient.find({
          Appointment: {
            $regex: futureDatePattern,
            $options: 'i',  // Case-insensitive
          },
          Appointment: { $gte: currentDate },
        }).sort({ Appointment: 1 });
    
        res.json(futureAppointments);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};

module.exports = {
    createPatient,
    getAllPatients,
    getPatient,
    deletePatient,
    updatePatient,
    filterAppointment
}