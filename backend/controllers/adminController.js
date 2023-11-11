const mongoose = require('mongoose')
const bcrypt =require('bcrypt')
const Adminstrator=require('../models/adminModel')
const PendingDoctorModel = require('../models/pendingdoctorModel'); // Assuming DoctorRequest model schema for pending doctor requests
const Doctor = require('../models/doctorModel'); // Assuming Doctor model schema for approved doctors
const Patient =require('../models/PatientModel')
const HealthPackage = require('../models/healthPackageModel');


const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());


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
    const { doctorId } = req.body;
  
    try {
        const pendingDoctor = await PendingDoctorModel.findById(doctorId);
  
        if (!pendingDoctor) {
            return res.status(404).json({ error: 'Doctor request not found' });
        }
      
        const hashedPassword = await bcrypt.hash(pendingDoctor.password, 10);

        // Create a new doctor in the doctors collection
        const newDoctor = new Doctor({
          username: pendingDoctor.username,
          name: pendingDoctor.name,
          email: pendingDoctor.email,
          password: hashedPassword, 
          dateOfBirth: pendingDoctor.dateOfBirth,
          hourlyRate: pendingDoctor.hourlyRate,
          affiliation: pendingDoctor.affiliation,
          educationalBackground: pendingDoctor.educationalBackground,
        });
        await newDoctor.save();
        // Remove the doctor request from the pending requests collection
        await PendingDoctorModel.findByIdAndDelete(doctorId);
  
        res.status(201).json({ message: 'Doctor approved successfully and added to doctors database' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



//to reject requests
const rejectRequests = async (req, res) => {
   const { doctorId } = req.body;
  
   try {
    const pendingDoctor = await PendingDoctorModel.findById(doctorId);

    if (!pendingDoctor) {
        return res.status(404).json({ error: 'Doctor request not found' });
    }
    await PendingDoctorModel.findByIdAndDelete(doctorId);

    res.status(200).json({ message: 'Doctor registration request rejected successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
  
 //add new admin
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
      dateofbirth: patient.dateOfBirth,
      gender: patient.gender,
      mobilenumber: patient.mobileNumber,
      emergencyfullname: patient.EmergencyContactName,
      emergencynumber: patient.EmergencyContactNo,
      // Include other patient information fields as needed
    };

    res.status(200).json(patientInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// create health package 
const createHealthPackage = async (req, res) => {
  const { type, price, doctorSessionDiscount, medicineDiscount, familySubscriptionDiscount } = req.body;

  try {
      const healthPackage = await HealthPackage.create({
          type: type,
          price: price,
          doctorSessionDiscount: doctorSessionDiscount,
          medicineDiscount: medicineDiscount,
          familySubscriptionDiscount: familySubscriptionDiscount
      });

      res.status(201).json(healthPackage);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};





// update health package 
const updateHealthPackage = async (req, res) => {
const { healthPackageId, price, doctorSessionDiscount, medicineDiscount, familySubscriptionDiscount } = req.body;


try {
    const updatedPackage = await HealthPackage.findByIdAndUpdate(
        healthPackageId,
        {
            price: price,
            doctorSessionDiscount: doctorSessionDiscount,
            medicineDiscount: medicineDiscount,
            familySubscriptionDiscount: familySubscriptionDiscount
        },
        { new: true }
    );

    if (!updatedPackage) {
        return res.status(404).json({ error: 'Health Package not found.' });
    }

    res.status(200).json(updatedPackage);
} catch (error) {
    res.status(400).json({ error: error.message });
}
};


// delete health package
const deleteHealthPackage = async (req, res) => {
const { healthPackageId } = req.body; 

try {
    const deletedPackage = await HealthPackage.findByIdAndDelete(healthPackageId);

    if (!deletedPackage) {
        return res.status(404).json({ error: 'Health Package not found.' });
    }

    res.status(200).json({ message: 'Health Package deleted successfully.' });
} catch (error) {
    res.status(500).json({ error: error.message });
}
};

module.exports ={
    viewRequests,
    approveRequests,
    rejectRequests,
    addAdmin,
    removeUser,
    viewPatientInfo,
    createHealthPackage ,
    updateHealthPackage,
    deleteHealthPackage,

    
}