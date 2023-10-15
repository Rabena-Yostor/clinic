
const mongoose = require('mongoose')
// const jwt =require('jsonwebtoken')
// const asyncHandler =require('express-async-handler')
const bcrypt =require('bcrypt')
const Patient =require('../models/patientModel')

//to register user

const registerPatient = async (req, res) => {
        console.log('Received request body:', req.body); 

        const { username, name, email, password, dateofbirth, gender, mobilenumber, emergencyfullname,emergencynumber} = req.body;


        // Check for missing fields
     if(!username || !name || !email || !password || !dateofbirth || !gender || !mobilenumber || !emergencyfullname|| !emergencynumber) {
            return res.status(400).json({ error: 'Please provide all fields' });
        }

        // Check if patient with the same email exists
       
  try {

     const patientExists = await Patient.findOne({ email });

     if (patientExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password securely before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new patient instance with hashed password
        const newPatient = await Patient.create({
            username,
            name,
            email,
            password: hashedPassword,
            dateofbirth,
            gender,
            mobilenumber,
            emergencyfullname,
            emergencynumber
        });

        res.status(201).json({
            _id: newPatient.id,
            username: newPatient.username,
            name: newPatient.name,
            email: newPatient.email,
            dateofbirth: newPatient.dateofbirth,
            gender: newPatient.gender,
            mobilenumber: newPatient.mobilenumber,
            emergencyfullname : newPatient.emergencyfullname,
            emergencynumber : newPatient.emergencynumber
        });

    } catch (error) {
        // Handle database or other errors
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
  }
  

 };






const loginPatient = (req, res) => {
    res.json({message: 'User logged in'})
}






module.exports ={
    registerPatient,
    loginPatient,
    
}