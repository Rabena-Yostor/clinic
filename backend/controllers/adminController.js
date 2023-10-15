const mongoose = require('mongoose')
const bcrypt =require('bcrypt')
const Adminstrator=require('../models/adminModel')
const PendingDoctorModel = require('../models/pendingdoctorModel'); // Assuming DoctorRequest model schema for pending doctor requests
const Doctor = require('../models/doctorModel'); // Assuming Doctor model schema for approved doctors
const Patient =require('../models/patientModel')






//to get rewuests
const viewRequests = async (req, res) => {
    try {
      const PendingDoctorRequest = await PendingDoctorModel.find().populate('doctor');
      res.status(200).json(PendingDoctorRequest);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


// to accept requests
  const approveRequests = async (req, res) => {
    const { doctorId } = req.params;
  
    try {
      // Find the doctor request by ID
      const pendingDoctor  = await PendingDoctorRequest .findById(doctorId);
  
      // Check if the doctor request exists
      if (!pendingDoctor ) {
        return res.status(404).json({ error: 'Doctor request not found' });
      }
  
      // Create a new doctor in the doctors collection
      const newDoctor = await Doctor.create({
        username: pendingDoctor .username,
        name: pendingDoctor.name,
        email: pendingDoctor.email,
        password: pendingDoctor.password,
        dateofbirth: pendingDoctor.dateOfBirth,
        hourlyrate: pendingDoctor.hourlyRate,
        affiliation: pendingDoctor.affiliation,
        educationalbackground: pendingDoctor.educationalBackground
      });
  
      // Remove the doctor request from the pending requests collection
      await PendingDoctorRequest .findByIdAndDelete(doctorId);
  
      res.status(201).json({ message: 'Doctor approved successfully and added to doctors database' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


//to reject requests
    const rejectRequests = async (req, res) => {
    const { doctorId } = req.params;
  
    try {
      // Remove the doctor request from the pending requests collection
      const deletedPindingDoctorRequest = await PendingDoctorRequest .findByIdAndDelete(doctorId);
  
      // Check if the doctor request exists
      if (!deletedPendingDoctorRequest) {
        return res.status(404).json({ error: 'Doctor request not found' });
      }
  
      res.status(200).json({ message: 'Doctor registration request rejected' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  const addAdmin = async (req, res) => {
    try {
      const { username, password } = req.body;
      const existingAdmin = await Adminstrator.findOne({ username });
      if (existingAdmin) {
        return res.status(400).json({ error: 'Admin already exists' });
      }

      //hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new admin instance
      const newAdmin = new Adminstrator({
          username,
          password: hashedPassword,
      });
      await newAdmin.save();

        res.status(201).json({ message: 'Admin added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // remove any user
    const removeUser = async (req, res) => {
    const { userType, userId } = req.body;

    try {
      let user;
      switch (userType) {
          case 'doctor':
              user = await Doctor.findByIdAndDelete(userId);
              break;
          case 'patient':
              user = await Patient.findByIdAndDelete(userId);
              break;
          case 'admin':
              user = await Adminstrator.findByIdAndDelete(userId);
              break;
          default:
              return res.status(400).json({ error: 'Invalid user type' });
      }

      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ message: 'User removed successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get patient info
const viewPatientInfo= async (req, res) => {
  try {
    const { patientId } = req.query;

    // Find patient by ID in the database
    const patient = await Patient.findById(patientId);

    // Check if patient exists
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const patientInfo = {
      username: patient.username,
      name: patient.name,
      email: patient.email,
      dateofbirth: patient.dateofbirth,
      gender: patient.gender,
      mobilenumber: patient.mobilenumber,
      emergencyfullname: patient.emergencyfullname,
      emergencynumber: patient.emergencynumber,
      // Include other patient information fields as needed
    };

    res.status(200).json(patientInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports ={
    viewRequests,
    approveRequests,
    rejectRequests,
    addAdmin,
    removeUser,
    viewPatientInfo,

    
}