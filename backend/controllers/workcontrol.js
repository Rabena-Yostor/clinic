const workouts= require('../models/work')
const mongoose=require('mongoose')

const getWorkout= async (req, res)=> {
    const workouts= await workouts.find({})

    res.status(200).json(workouts)
}



const getsingleworkout= async (req, res)=>{
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){

        return res.status(404).json({error: 'no solution'})
    }



    const workouts= await workouts.findById(id)

    if(!workouts){
        return res.status(404).json({error: 'no solutions'})
    }

    res.status(200).json(workouts)
}








const CreateWorkout = async (req, res) =>{
    const {Name,National_id, age, gender, relation}=req.body
try {
    const workout= await workouts.create({Name,National_id, age, gender, relation})
    res.status(200).json(workout)
} catch (error) {
    res.status(400).json({error: error.message})
}
}


const deletework= async (req, res)=>{
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){

        return res.status(404).json({error: 'no solution'})
    }

    const workouts= await workouts.findOneAndDelete({_id: id})

    if(!workouts){
        return res.status(400).json({error: 'no solutions'})
    }

    res.status(200).json(workouts)
    
}


const updatework= async (req, res)=> {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){

        return res.status(404).json({error: 'no solution'})
    }
    const workouts= await workouts.findOneAndUpdate({_id: id}, {...req.body})

    if(!workouts){
        return res.status(400).json({error: 'no solutions'})
    }

    res.status(200).json(workouts)
    
}


const getFamilyMembers= async(req, res)=>{
    try {
        const{username}= req.params;
        console.log({username})
        const familyMembers= await workouts.find({patientusername: username});
        console.log(familyMembers)

        if(familyMembers.length==0){
            return res.status(404).json({message:'no solution'});
            
        }
        res.status(200).json(familyMembers);
    } catch (error) {
        console.error('error:',error);
        res.status(500).json({message:'error'});
    }
}

module.exports= {
    CreateWorkout, getWorkout, getsingleworkout, deletework, updatework, getFamilyMembers
}