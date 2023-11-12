const express = require('express');
const {
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
    depositToWallet,
    withdrawFromWallet, // Include the wallet functions
} = require('../controllers/patientController');
const router = express.Router();

router.get('/getAllPatients', getAllPatients);
router.get('/getPatient/:id', getPatient);
router.post('/createPatient', createPatient);
router.delete('/deletePatient/:id', deletePatient);
router.patch('/updatePatient/:id', updatePatient);
router.get('/filterAppointment/:id', filterAppointment);
router.post('/registerPatient', registerPatient);
router.post('/loginPatient', loginPatient);
router.get('/getFamilyMembers/:username', getFamilyMembers);
router.post('/addFamilyMember/:id', addFamilyMember);
router.get('/filterAppointmentPatient', filterAllApps);

// New routes for wallet operations
router.post('/depositToWallet/:id', depositToWallet);
router.post('/withdrawFromWallet/:id', withdrawFromWallet);

module.exports = router;
