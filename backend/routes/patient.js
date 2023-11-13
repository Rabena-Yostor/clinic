const express = require('express');
const patient = require('../models/PatientModel')
const authenticatePatient = require('../Middleware/authenticatePatient'); 
const { requireAuth } = require('../Middleware/authMiddleware');
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
    getWalletAmount,
    signUp,
    login,
    logout,
    updatePatientPassword,
    sendOtpAndSetPassword,
    getHealthPackages,
    subscribeToHealthPackage,
    getSubscribedHealthPackages,
    getSubscriptionStatus,
    cancelSubscription,
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

router.get('/viewHealthRecords/:username', getHealthRecord);
router.get('/wallet-amount/:username', getWalletAmount);

router.get('/viewHealthPackage',getHealthPackages) 

router.post('/subscribeHealthPackage',subscribeToHealthPackage)

router.get('/getSubscribedHealthPackages',getSubscribedHealthPackages)

router.get('/getSubscriptionStatus',getSubscriptionStatus)
router.post('/cancelSubscription',cancelSubscription)

//sign up
router.post('/signup',signUp)

//login
router.post('/login',login)

//logout
router.get('/logout',logout)

//update password
router.post('/updatePatientPassword',updatePatientPassword)

//send otp and set password
router.post('/sendOtpAndSetPassword',sendOtpAndSetPassword)

module.exports = router