//to have an access 
const express = require('express')
const router = express.Router()
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout,

} = require('../controllers/workoutcontroller')




//GET all workouts 
router.get ('/', getWorkouts)


//GET a single workout
router.get ('/:id',getWorkout)

//CREATE a new workout 
router.post ('/',createWorkout)  


//DELETE a workout
router.delete ('/:id',deleteWorkout)


//UPDATE a workout
router.patch ('/:id',updateWorkout)








module.exports = router