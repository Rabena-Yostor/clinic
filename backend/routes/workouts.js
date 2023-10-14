const express = require('express')
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


  
module.exports = router