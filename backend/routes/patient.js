const express = require('express');
const patient = require('../models/PatientModel')
const{
    createPatient,
    getAllPatients,
    getPatient,
    deletePatient,
    updatePatient,
    filterAppointment,
    registerPatient,
    loginPatient,
    getFamilyMembers,
    addFamilyMember,
    filterAllApps,
    getHealthRecord,
    uploadDocument,
    uploadMiddlewareSingle,
    removeDocument
} = require('../controllers/patientController');
const router = express.Router()

router.get('/getAllPatients',getAllPatients)

router.get('/getPatient/:id', getPatient)

router.post('/createPatient', createPatient)

router.delete('/deletePatient/:id',deletePatient)

router.patch('/updatePatient/:id', updatePatient)

router.get('/filterAppointment/:id',filterAppointment)

router.post('/registerPatient',registerPatient)

router.post('/loginPatient',loginPatient)

router.get('/getFamilyMembers/:username',getFamilyMembers)

router.post('/addFamilyMember',addFamilyMember)

router.get('/filterAppointmentPatient',filterAllApps)

router.get('/getHealthRecord/:id',getHealthRecord);

router.post('/uploadDocument/:username', uploadMiddlewareSingle, uploadDocument);

router.delete('/removeDocument/:username/:documentId', removeDocument);

router.get('/medicalHistoryFiles', async (req, res) => {
    try {
        const loggedInUsername = 'khaled';  // Replace with your authentication logic
        const loggedinPatient = await patient.findOne({ username: loggedInUsername });

        if (!loggedinPatient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        const medicalHistoryFiles = loggedinPatient.medicalHistoryFiles || [];
        res.status(200).json(medicalHistoryFiles);
    } catch (error) {
        console.error('Error fetching medical history files:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router