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
    viewPatientAccount,
    getHealthRecord,
    login,
    changePatientPassword
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
router.get('/viewPatientAccount',viewPatientAccount)
router.get('/viewHealthRecords',getHealthRecord)
router.post('/login', login)
router.post('/changePassword',changePatientPassword)

module.exports = router