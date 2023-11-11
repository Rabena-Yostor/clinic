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
    getHealthPackages,
    subscribeToHealthPackage,
    getSubscribedHealthPackages,
    getSubscriptionStatus,
    cancelSubscription,
    getFamilyMembers,
    addFamilyMember,
    filterAllApps
} = require('../controllers/patientController');
const router = express.Router()

router.get('/getAllPatients',getAllPatients)

router.get('/getPatient/:id', getPatient)

router.post('/createPatient', createPatient)

router.delete('/deletePatient/:id',deletePatient)

router.patch('/updatePatient/:id', updatePatient)

router.get('/filterAppointment/:id',filterAppointment)

router.post('/registerPatient',registerPatient)

router.get('/viewHealthPackage',getHealthPackages) 

router.post('/subscribeHealthPackage',subscribeToHealthPackage)

router.get('/getSubscribedHealthPackages',getSubscribedHealthPackages)

router.get('/getSubscriptionStatus',getSubscriptionStatus)

router.get('/getFamilyMembers/:username',getFamilyMembers)

router.post('/cancelSubscription',cancelSubscription)

router.post('/addFamilyMember',addFamilyMember)

router.get('/filterAppointmentPatient',filterAllApps)


module.exports = router