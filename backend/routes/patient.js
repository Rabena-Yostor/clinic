const express = require('express');
const patient = require('../models/PatientModel')
const{
    createPatient,
    getAllPatients,
    getPatient,
    deletePatient,
    updatePatient,
    filterAppointment
} = require('../controllers/patientController')
const router = express.Router()

router.get('/',getAllPatients)

router.get('/:id', getPatient)

router.post('/', createPatient)

router.delete('/:id',deletePatient)

router.patch('/:id', updatePatient)

router.get('/upcoming-appointments',filterAppointment)




module.exports = router