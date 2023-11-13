const express = require('express')

const {
    createDoctor,
    getDoctor,
    getDoctors,
    updateDoctor,
    deleteDoctor,
    submitRequest,
    updateDoctorAffiliation,
    updateDoctorEmail,
    updateDoctorHourlyRate,
    addDoctor,
    filterAllApps,
    getPatientsForDoctor  , 
    addAppointments,
    getAvailableAppointments,
    
     
}= require('../controllers/doctorController')


const router = express.Router()

// get all doctors
router.get('/getAllDoctors', getDoctors)
// get a single Doctor
router.get('/getDoctor/:id', getDoctor)
// post a new Doctor
router.post('/createDoctor', createDoctor)
// delete a Doctor
router.delete('/deleteDoctor/:id', deleteDoctor)
// update a Doctor
router.patch('/updateDoctor/:id',updateDoctor)

//MALAK
router.post ('/submitRequest', submitRequest)
//KHALED
router.put('/updateDoctorEmail', updateDoctorEmail)
router.put('/updateDoctorHourlyRate', updateDoctorHourlyRate)   
router.put('/updateDoctorAffiliation', updateDoctorAffiliation)

router.post('/addDoctor', addDoctor)

router.get('/filterAllApps/doctor', filterAllApps)
router.get('/getPatientsForDoctor', getPatientsForDoctor)

router.post('/addAppointments/:id', addAppointments)

router.get('/getAvailableAppointments/:id', getAvailableAppointments)


module.exports = router 