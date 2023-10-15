const mongoose = require('mongoose')
const PendingDoctorRequest = require('../models/pendingdoctorModel');
const bcrypt =require('bcrypt')

//to submit a request
const submitRequest = async (req, res) => {
    const { username, name, email, password, dateofbirth, hourlyrate, affiliation, educationalbackground } = req.body;

    if(!username|| !name ||!email || !password || !dateofbirth ||!hourlyrate || !affiliation || !educationalbackground){
        return res.status(400).json({ error: 'Please provide all fields' });
    }
    try {
        const requestExists = await PendingDoctorRequest.findOne({ email });
        if (requestExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the request in the pending requests collection
        const newPendingDoctorRequest = await PendingDoctorRequest.create({
            username,
            name,
            email,
            password: hashedPassword,
            dateofbirth,
            hourlyrate,
            affiliation,
            educationalbackground,
        });

        res.status(200).json({ message: 'Doctor registration request sent to admin for approval' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};






module.exports ={
    submitRequest,
    
    
}