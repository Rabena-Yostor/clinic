const express = require('express')
const {
    createDoctor,
    getDoctor,
    getDoctors,
    updateDoctor,
    deleteDoctor
}= require('../controllers/doctorController')


const router = express.Router()

// get all doctors
router.get('/', getDoctors)
// get a single Doctor
router.get('/:id', getDoctor)
// post a new Doctor
router.post('/', createDoctor)
// delete a Doctor
router.delete('/:id', deleteDoctor)
// update a Doctor
router.patch('/:id',updateDoctor)


module.exports = router 