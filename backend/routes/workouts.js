const express = require('express')
const request_register_as_doctor =require('../models/WorkoutModel')

const router = express.Router()

// get all workouts routes
router.get('/', (req, res) => {
    res.json({
        mssg: 'Get all workouts'})
})
// get one workout route
router.get('/:id', (req, res) => {
    res.json({
        message: 'Get one workout'})
})  
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
router.post('/', async(req, res) => {
    const{UserName,Name,Email,Password,DateOfBirth,HourlyRate,AffiliatedHospital,Education} = req.body
    try{
        const workout = await request_register_as_doctor.create({UserName,Name,Email,Password,DateOfBirth,HourlyRate,AffiliatedHospital,Education})
        res.status(201).json({workout})
    }catch(error){
        res.status(400).json({message: 'Bad request'})

    }
  
    })

  
module.exports = router