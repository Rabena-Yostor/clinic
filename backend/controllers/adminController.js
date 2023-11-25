const mongoose = require('mongoose')
const bcrypt =require('bcrypt')
const Adminstrator=require('../models/adminModel')
const PendingDoctorModel = require('../models/pendingdoctorModel'); // Assuming DoctorRequest model schema for pending doctor requests
const Doctor = require('../models/doctorModel'); // Assuming Doctor model schema for approved doctors
const Patient =require('../models/PatientModel')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const HealthPackage = require('../models/healthPackageModel');




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
//signup and login
const maxAge = 3 * 24 * 60 * 60;
const createToken = (name) => {
    return jwt.sign({ name }, 'supersecret', {
        expiresIn: maxAge
    });
};

const signUp = async (req, res) => {
  const { username, password } = req.body;
  try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await Adminstrator.create({ username, password: hashedPassword });
      const token = createToken(user.username);

      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json(user)
  } catch (error) {
      res.status(400).json({ error: error.message })
  }
}

const login = async (req, res) => {
  // TODO: Login the user
  const { username, password } = req.body;
  try {
      const user = await Adminstrator.findOne({ username : username});
      if (user) {
          const auth = await bcrypt.compare(password, user.password);
          if (auth) {
              const token = createToken(user.username);
              res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
              res.status(200).json({user})
          } else {
              res.status(400).json({ error: "Wrong password" })
          }
      } else {
          res.status(400).json({ error: "User not found" })
      }
  } catch (error) {
      res.status(400).json({ error: error.message })
  }
}

//logout
const logout = async (req, res) => {
  // TODO Logout the user
  res.cookie('jwt', '', { maxAge: 1 });
  res.status(200).json("logged out")
  //res.clearCookie('jwt');
  //res.status(200)
}

//update password
const updateAdminPassword = async (req, res) => {
  const { username, currentPassword, newPassword } = req.body;

  try {
    // Retrieve the admin user by username
    const user = await Adminstrator.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the current password is correct
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isCurrentPasswordValid) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Check if the new password meets the specified criteria
    const newPasswordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!newPassword.match(newPasswordRegex)) {
      return res.status(400).json({
        error: 'New password must contain at least one capital letter and one number, and be at least 6 characters long',
      });
    }

    // Hash and update the password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//Reset password
const generateNumericOTP = (length) => {
  const otpLength = length || 6; // Default length is 6 if not provided
  let otp = '';

  for (let i = 0; i < otpLength; i++) {
    otp += Math.floor(Math.random() * 10); // Generate a random digit (0-9)
  }

  return otp;
};

const sendOtpAndSetPassword = async (req, res) => {
  const { username , Email } = req.body;

  try {
    const user = await Adminstrator.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate OTP
    const otp = generateNumericOTP(); // You may need to configure OTP generation options

    // Update user's password with the OTP
    const hashedNewPassword = await bcrypt.hash(otp, 10);
    user.password = hashedNewPassword;
    await user.save();

    // Send OTP to the user's email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'peteraclsender@gmail.com',
        pass: 'tayr rzwl yvip tqjt',
      },
    });
    const mailOptions = {
      from: 'peteraclsender@gmail.com',
      to: Email,
      subject: 'Password Reset OTP',
      text: `Your new Admin OTP is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: 'Error sending OTP via email' });
      }
      res.status(200).json({ message: 'OTP sent successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
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
    signUp,
    login,
    logout,
    updateAdminPassword,
    createHealthPackage ,
    updateHealthPackage,
    deleteHealthPackage,
    sendOtpAndSetPassword
}