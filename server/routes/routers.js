const express = require('express')

const {
    createPrescription,
    getPrescriptions,
    getSinglePrescription,
    deletePrescription,
    updatePrescription,
    filterPrescriptions,
} = require ('../controllers/prescriptionController')

const router = express.Router()

//GET ALL perscriptions
router.get('/', getPrescriptions)


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
module.exports = router