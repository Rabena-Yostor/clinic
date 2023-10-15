const Request = require('../models/requestRegisterAsDoctor')

const mongoose = require('mongoose')

// get all workouts routes
const getAllWorkouts = async(req, res) => {
    try{
        const workouts = await Request.find({}).sort({createdAt: -1})
        res.status(200).json({workouts})
    }catch(error){
        res.status(400).json({message: 'Bad request'})
    }
}




// get one workout route
const getOneWorkout = async(req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: 'No such workout'})
    }
    const workout = await Request.findById(id)
    if(!id){
        res.status(404).json({message: 'No such workout'})
    }
    res.status(200).json({workout}) 
} 


//create new workout route
const createWorkout = async(req, res) => {
    const{UserName,Name,Email,Password,DateOfBirth,HourlyRate,AffiliatedHospital,Education} = req.body
    //const {title, reps, load} = req.body
    try{
        const workout = await Request.create({UserName,Name,Email,Password,DateOfBirth,HourlyRate,AffiliatedHospital,Education})
        //const workout = await Workout.create({title, reps, load})      
        res.status(200).json({workout})
    }catch(error){
        res.status(400).json({message: 'Bad request'})

    }
}
//delete one workout route

//update one workout route


module.exports = { 
    getOneWorkout,
    getAllWorkouts, 
    createWorkout
}