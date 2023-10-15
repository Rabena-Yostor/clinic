const express = require('express')
const{
    createPatient,
    getAllPatients,
    getPatient,
    updatePatient,
    deletePatient
}=require('../controllers/patientController')


const{
    
    createWorkout,
    getAllWorkouts,
    getOneWorkout,
}=require('../controllers/workoutController')
//const { create } = require('../models/addAdmin')
//const Request_register_as_doctor =require('../models/WorkoutModel')
const{
    createAdmin,
    getAllAdmins,
} = require('../controllers/addAdminController')

const router = express.Router()

// get all workouts routes
router.get('/', getAllWorkouts)
// get one workout route
router.get('/:id', getOneWorkout)

//post new workout route
router.post('/doctor', createWorkout)





//post new admin route
router.post('/admin', createAdmin)
//get all admins route
router.get('/getadmin', getAllAdmins)
//get all patients route
router.get('/getpatient', getAllPatients)
//post new patient route
router.post('/patient', createPatient)
//get one patient route
router.get('/patient/:id', getPatient)
//update patient route
router.patch('/patient/:id', updatePatient)
//delete patient route
router.delete('/patient/:id', deletePatient)


  
module.exports = router