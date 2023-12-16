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
    findMedicine,
    deleteMedicineFromPrescription,
    addMedicineToPrescription,
    updateMedicineDosage,
    getPrescriptionsDoctor,
    checkMedicines,
} = require ('../controllers/prescriptionController')

const router = express.Router()

//GET ALL perscriptions
router.get('/prescriptions/:username', getPrescriptions)


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
router.get('/filterr/:username',filterPrescriptionn)







//CREATE PRESCRIPTON FOR SPECIFIC PATIENT
router.post('/create-prescription', createPrescriptionForPatient);

//CREATE PATIENT
router.post('/create-patient', createPatient);

//GET PRESCRIPTION OF PATIENT
router.get('/get-prescription/:username', getPrescription);

//FILTER
router.get('/prescription-filter/:username', filterPrescriptionsForPatient);

// VIEW PERSCRIPTION
router.get('/view-prescription/:prescriptionId', viewPrescription);

//find Medicine (testing accessing other collections)
router.get('/find-medicine', findMedicine);
router.put('/delete-medicine-from-prescription/:prescriptionId/:medicineName', deleteMedicineFromPrescription);
router.put('/add-medicine-to-prescription/:prescriptionId', addMedicineToPrescription);
router.put('/update-medicine-dosage/:prescriptionId/:medicineName/:newDosage', updateMedicineDosage);
router.get('/get-prescriptions-doctor/:username', getPrescriptionsDoctor);
router.get('/check-medicines', checkMedicines);
module.exports = router