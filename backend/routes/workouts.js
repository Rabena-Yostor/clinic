const express = require('express')
const{
    
    createWorkout,
    getAllWorkouts,
    getOneWorkout,
}=require('../controllers/workoutController')
//const { create } = require('../models/addAdmin')
//const Request_register_as_doctor =require('../models/WorkoutModel')
const{
    createAdmin
} = require('../controllers/addAdminController')

const router = express.Router()

// get all workouts routes
router.get('/', getAllWorkouts)
// get one workout route
router.get('/:id', getOneWorkout)
//delete one workout route
router.delete('/:id', (req, res) => {
    res.json({
        message: 'Delete one workout'})
})
//update one workout route
router.patch('/:id', (req, res) => {
    res.json({
        message: 'Update one workout'})
})


//post new workout route
router.post('/', createWorkout)
//post new admin route
router.post('/admin', createAdmin)


  
module.exports = router