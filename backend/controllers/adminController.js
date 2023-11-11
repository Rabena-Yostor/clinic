const mongoose = require('mongoose')
const bcrypt =require('bcrypt')
const Adminstrator=require('../models/adminModel')
const PendingDoctorModel = require('../models/pendingdoctorModel'); // Assuming DoctorRequest model schema for pending doctor requests
const Doctor = require('../models/doctorModel'); // Assuming Doctor model schema for approved doctors
const Patient =require('../models/PatientModel')






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

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the admin by username
    const admin = await Adminstrator.findOne({ username });

    if (!admin) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Compare the entered password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: admin._id }, 'yourSecretKey', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Change password
const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const changePassword = async (req, res) => {
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);
  const { currentPassword, newPassword } = req.body;
  const userType = req.userType; // Assuming you set userType during authentication

  try {
    let user;

    // Use the authenticated user information
    if (userType === 'doctor') {
      user = await Doctor.findById(req.user.id);
    } else if (userType === 'patient') {
      user = await Patient.findById(req.user.id);
    } else if (userType === 'admin') {
      user = await Adminstrator.findById(req.user.id);
    } else {
      return res.status(400).json({ message: 'Invalid user type' });
    }

    if (!user || !(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ message: 'Incorrect current password' });
    }

    // Assuming you have a function to hash passwords securely
    user.password = await hashPassword(newPassword);
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Compare password method
const comparePasswords = async (candidatePassword, hashedPassword) => {
  try {
    const match = await bcrypt.compare(candidatePassword, hashedPassword);
    return match;
  } catch (error) {
    console.error('Error comparing passwords', error);
    return false;
  }
};

module.exports ={
    viewRequests,
    approveRequests,
    rejectRequests,
    addAdmin,
    removeUser,
    viewPatientInfo,
    login,
    changePassword,

    
}