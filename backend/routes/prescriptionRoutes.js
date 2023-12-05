const express = require('express')

const {
    createPrescription,
    getPrescriptions,
    getSinglePrescription,
    deletePrescription,
    updatePrescription,
    filterPrescriptions,
    createPrescriptionForPatient,
    createPatient,
    getPrescription,
    filterPrescriptionsForPatient,
    viewPrescription,
    filterPrescriptionn,
    fetchAllPrescriptions
} = require ('../controllers/prescriptionController')

const router = express.Router()

//GET ALL perscriptions
router.get('/prescriptions', getPrescriptions)


//GET Single workout

router.get ('/name',getSinglePrescription)

//POST
router.post('/',createPrescription)

// DELETE
router.delete ('/:id',deletePrescription)

// UPDATE
router.patch ('/:id',updatePrescription)

//FILTERED 
router.get('/filter',filterPrescriptions)


//FILTERR
router.get('/filterr',filterPrescriptionn)





router.get('/fetchAllPrescriptions', fetchAllPrescriptions);

//CREATE PRESCRIPTON FOR SPECIFIC PATIENT
router.post('/create-prescription', createPrescriptionForPatient);

//CREATE PATIENT
router.post('/create-patient', createPatient);

//GET PRESCRIPTION OF PATIENT
router.get('/get-prescription/:username', getPrescription);

//FILTER
router.get('/prescription-filter/:username', filterPrescriptionsForPatient);

// VIEW PERSCRIPTION
router.get('/view-prescription/:id', viewPrescription);

module.exports = router