const Doctor = require("../models/doctorModel");
const mongoose = require("mongoose");
const Patient= require('../models/PatientModel')
const PendingDoctorRequest = require('../models/pendingdoctorModel');
const HealthRecord = require("../models/HealthRecordModel");
const bcrypt =require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Notification = require("../models/ClinicNotificationModel");
const FollowUp = require('../models/followUpRequest');



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDirectory = path.join(__dirname, '../../frontend/public/uploads');
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

const uploadMiddleware = upload.fields([
  { name: 'idFile', maxCount: 1 },
  { name: 'degreeFile', maxCount: 1 },
  { name: 'licenseFile', maxCount: 1 },
]);
// get all doctors
const getDoctors = async (req, res) => {
  const doctors = await Doctor.find({}).sort({ createdAt: -1 });

  res.status(200).json(doctors);
};

// get a single doctor
const getDoctor = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such doctor" });
  }

  const doctor = await Doctor.findById(id);

  if (!doctor) {
    return res.status(404).json({ error: "No such doctor" });
  }
  res.status(200).json(doctor);
};

// create a new doctor
const createDoctor = async (req, res) => {
  const {
    username,
    name,
    email,
    password,
    dateOfBirth,
    hourlyRate,
    affiliation,
    speciality,
    educationalBackground,
    availableAppointment,
  } = req.body;

  // add doc to db
  try {
    const doctor = await Doctor.create({
      username,
      name,
      email,
      password,
      dateOfBirth,
      hourlyRate,
      affiliation,
      speciality,
      educationalBackground,
      availableAppointment,
    });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//delete a doctor
const deleteDoctor = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No sucn doctor" });
  }

  const doctor = await Doctor.findOneAndDelete({ _id: id });

  if (!doctor) {
    return res.status(400).json({ error: "No such doctor" });
  }

  res.status(200).json(doctor);
};

// update a doctor

const updateDoctor = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No sucn doctor" });
  }

  const doctor = await Doctor.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!doctor) {
    return res.status(400).json({ error: "No such doctor" });
  }
  res.status(200).json(doctor);
};

// MALAK WAEL FOLDER. DO NOT TOUCH
const submitRequest = async (req, res) => {
  const { username, name, email, password, dateofbirth, hourlyrate, affiliation, educationalbackground } = req.body;
  const idFile = req.files['idFile'][0];
  const degreeFile = req.files['degreeFile'][0];
  const licenseFile = req.files['licenseFile'][0];
  const idFileData = fs.readFileSync(idFile.path);
  const degreeFileData = fs.readFileSync(degreeFile.path);
  const licenseFileData = fs.readFileSync(licenseFile.path);


  // if(!username|| !name ||!email || !password || !dateofbirth ||!hourlyrate || !affiliation || !educationalbackground){
  //     return res.status(400).json({ error: 'Please provide all fields' });
  // }
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
      dateOfBirth:dateofbirth,
      hourlyRate:hourlyrate,
      affiliation,
      educationalBackground:educationalbackground,
      idFile: {
        data: idFileData,
        contentType: idFile.mimetype
      },
      degreeFile: {
        data: degreeFileData,
        contentType: degreeFile.mimetype
      },
      licenseFile: {
        data: licenseFileData,
        contentType: licenseFile.mimetype
      }
    });
    res.status(200).json({ message: 'Doctor registration request sent to admin for approval' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
//////////


//////KHALED MAGDY FOLDER. DO NOT TOUCH
const updateDoctorEmail = async (req, res) => {
  const { username, email } = req.body;
 try {
     const doctor = await Doctor.findOne({ username: username });
     doctor.email = email;
     console.log(doctor.username)
     doctor.save();
     res.status(200).json(doctor);
 } catch (error) {
     res.status(404).json({ message: error.message });
 }
}

const updateDoctorHourlyRate = async (req, res) => {
  const { username, hourlyRate } = req.body;
  try {
      const doctor = await Doctor.findOne({ username: username });
      doctor.hourlyRate = hourlyRate;
      doctor.save();
      res.status(200).json(doctor);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

const updateDoctorAffiliation = async (req, res) => {
  const { username, affiliation } = req.body;
  try {
      const doctor = await Doctor.findOne({ username: username });
      doctor.affiliation = affiliation;
      doctor.save();
      res.status(200).json(doctor);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}
/////////////////////////////////////////// END OF KHALED

///////////////////////////////////////// HANA'S FOLDER

const filterAllApps = async (req, res) => {
  try {
      const { date, status } = req.query;

      const filter = {};

      if (date) {
          filter.availableAppointment = date;
      }

      if (status) {
          filter.Appointment_Status = status;
      }

      const filteredAppointments = await Doctor.find(filter);

      if (filteredAppointments.length === 0) {
          return res.status(404).send('No matching appointments found');
      }
  const doctors = await Doctor.find(filter);
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getPatientsForDoctor = async (req, res) => {
  const username = req.params.username;

  try {
      const doctor = await Doctor.findById(username).populate('ArrayOfPatients');

      if (!doctor) {
          return res.status(404).json({ error: 'Doctor not found.' });
      }

      const patients = doctor.ArrayOfPatients;
      return res.json({ patients });
  } catch (error) {
      console.error('Error fetching patients:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
}

const addDoctor = async (req, res) => {
  const {
    username,
    name,
    email,
    password,
    dateOfBirth,
    hourlyRate,
    affiliation,
    speciality,
    educationalBackground,
    availableAppointment,
    Appointment_Status,
    arrayOfPatients
  } = req.body;

  try {
      const newDoctor = await Doctor.create({
        username,
        name,
        email,
        password,
        dateOfBirth,
        hourlyRate,
        affiliation,
        speciality,
        educationalBackground,
        availableAppointment,
        Appointment_Status,
        arrayOfPatients
      });

      res.status(201).json({ doctor: newDoctor });
  } catch (error) {
      console.error('Error creating doctor:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addHealthRecord = async (req, res) => {
  const { username } = req.params;
  const { newHealthRecordData } = req.body;

  try {
    console.log('Adding health record for patient:', username);
    const patient = await Patient.findOne({ username });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    newHealthRecordData.patientId = patient._id;
    const existingHealthRecord = await HealthRecord.findOne({ patientId: patient._id });

    if (existingHealthRecord) {

      await existingHealthRecord.updateOne(newHealthRecordData);
      res.status(200).json({ message: 'Health record updated successfully', healthRecord: existingHealthRecord });
    } else {
    const { bloodPressure, heartRate, allergies, medications } = newHealthRecordData;
    const newHealthRecord = await HealthRecord.create({
      patientId: patient._id,
      bloodPressure,
      heartRate,
      allergies,
      medications
    });
    await newHealthRecord.save();
    res.status(201).json({ message: 'Health record added successfully' });
  }
  } catch (error) {
    console.error('Error adding health record:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// View health records for a specific patient
const viewHealthRecords = async (req, res) => {
  const { username } = req.params;

  try {
    // Assuming you have a User model with a 'username' field
    const user = await Patient.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const healthRecords = await HealthRecord.find({ patientId: user._id });

    if (healthRecords.length === 0) {
      return res.status(404).json({ message: 'No health records found for the specified patient' });
    }

    res.status(200).json(healthRecords);
  } catch (error) {
    console.error('Error fetching health records:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getWalletAmount = async (req, res) => {
  try {
      // Retrieve patient information based on the provided username parameter
      const username = req.params.username;
      const doc = await Doctor.findOne({ username });

      if (!doc) {
          return res.status(404).json({ error: 'Doctor not found' });
      }

      // Send the wallet amount in the response
      res.json({ walletAmount: doc.WalletAmount });
  } catch (error) {
      console.error('Error retrieving wallet amount:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};
const maxAge = 3 * 24 * 60 * 60;
const createToken = (name) => {
    return jwt.sign({ name }, 'supersecret', {
        expiresIn: maxAge
    });
};

const signUp = async (req, res) => {
  const { username,
    name,
    email,
    password,
    dateOfBirth,
    hourlyRate,
    affiliation,
    speciality,
    educationalBackground,
    availableAppointment, } = req.body;
  try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await Doctor.create({  username,
        name,
        email,
        password: hashedPassword ,
        dateOfBirth,
        hourlyRate,
        affiliation,
        speciality,
        educationalBackground,
        availableAppointment});
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
      const user = await Doctor.findOne({ username : username});
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
const updateDoctorPassword = async (req, res) => {
  const { username, currentPassword, newPassword } = req.body;

  try {
    // Retrieve the admin user by username
    const user = await Doctor.findOne({ username });

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
    const user = await Doctor.findOne({ username });

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
      text: `Your new Doctor OTP is: ${otp}`,
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
// doctorController.js

// Function to remove an appointment for a specific doctor by ID and appointment date
const removeAppointment = async (req, res) => {
  const { id, appointmentDate } = req.params;

  try {
    // Find the doctor by ID
    const doctor = await doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Remove the selected appointment from the Appointments array
    doctor.Appointments = doctor.Appointments.filter((date) => date.toISOString() !== appointmentDate);

    // Save the updated doctor with the removed appointment
    await doctor.save();

    res.status(200).json({ message: 'Appointment removed successfully', doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const createNotificationDoctor = async (req, res) => {
  try {
    const { DoctorName, message } = req.body;

    // Validate required fields
    if (!DoctorName || !message ) {
      return res.status(400).json({ message: 'Recipient ID, message are required' });
    }

    // Find the recipient
    const recipient = await Doctor.findOne({ username: DoctorName });

    // Create a new notification
    const notification = new Notification({
      recipient_id: recipient._id,
      message,
    });

    // Save the notification to the database
    await notification.save();

    return res.status(201).json({ message: 'Notification created successfully', notification });
  } catch (error) {
    console.error('Error creating notification:', error);
    return res.status(500).json({ message: 'Error creating notification' });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;

    // Validate notification ID
    if (!notificationId) {
      return res.status(400).json({ message: 'Notification ID is required' });
    }

    // Find and delete the notification
    const deletedNotification = await Notification.findByIdAndDelete(notificationId);

    if (!deletedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    return res.status(200).json({ message: 'Notification deleted successfully', deletedNotification });
  } catch (error) {
    console.error('Error deleting notification:', error);
    return res.status(500).json({ message: 'Error deleting notification' });
  }
};

//Get all notifications
const getAllNotificationsDoctor = async (req, res) => {
  try {
    const { username } = req.body;

    // Validate the username
    if (!username) {
      return res.status(400).json({ message: 'Username is required in the request body' });
    }

    // Find the pharmacist by username
    const doctor = await Doctor.findOne({ username: username });
    console.log(doctor)

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Get all notifications for the pharmacist based on their ID
    const notifications = await Notification.find({ recipient_id: doctor._id });

    return res.status(200).json({ notifications });
  } catch (error) {
    console.error('Error getting notifications:', error);
    return res.status(500).json({ message: 'Error getting notifications' });
  }
};


const DoctorFollowUpRequests = async (req, res) => {
  const {doctorUsername}=req.params
  try {
    const followUps = await FollowUp.find({ doctorUsername: doctorUsername });
    if (!followUps) {
      return res.status(404).json({ error: "No follow-up requests" });
    }
    res.status(200).json(followUps);
} catch (error) {
    res.status(404).json({ message: error.message });
}
}

const acceptFollowUpRequest = async (req, res) => {
const { requestId, username } = req.params;
try {
    const followUpRequest = await FollowUp.findById(requestId);
    if (!followUpRequest) {
        return res.status(404).json({ error: 'Follow-up request not found' });
    }
    const patient = await Patient.findOne({ username: username });
  if (!patient) {
    return res.status(404).json({ error: 'Patient not found' });
  }
    const appointment = {
      date: followUpRequest.date, // Convert the date to a JavaScript Date object
      status: 'upcoming', // Default status
    };
    patient.appointments.push(appointment);
    await patient.save();
    await followUpRequest.deleteOne();
    res.status(200).json({ message: 'Follow-up request accepted successfully' });
} catch (error) {
    console.error('Error accepting follow-up request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
}

const rejectFollowUpRequest = async (req, res) => {
const { requestId} = req.params;
try {
  const followUpRequest = await FollowUp.findById(requestId);
  res.status(200).json({ message: 'Follow-up request rejected successfully' });
await followUpRequest.deleteOne();
} catch (error) {
  console.error('Error rejecting follow-up request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}

};

//start call
function generateUniqueCallId() {
  return 'call_' + Math.random().toString(36).substr(2, 9);
}
function storeCallDetails(callId, doctorId, patientId) {
  console.log(`Storing call details: callId=${callId}, doctorId=${doctorId}, patientId=${patientId}`);
  
}
const startcall = async (req, res) => {
  const callId = generateUniqueCallId();
  const { doctorId, patientId } = req.body;

  // Store call details in the database or in-memory storage
  storeCallDetails(callId, doctorId, patientId);

  // Send the call ID back to the client
  res.json({ callId });
};

//end call
function endCall(callId) {
  console.log(`Ending call with ID: ${callId}`);
 
}
const endcall =async  (req, res) => {
  const { callId } = req.body;

// Update call status in the database or in-memory storage
endCall(callId);

// Send a response back to the client
res.json({ message: 'Call ended successfully.' });
};

module.exports = {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  submitRequest,
  updateDoctorEmail,
  updateDoctorHourlyRate,
  updateDoctorAffiliation,
  filterAllApps,
  getPatientsForDoctor,
  addDoctor,
  addHealthRecord,
  viewHealthRecords,
  signUp,
  login,
  logout,
  updateDoctorPassword,
  sendOtpAndSetPassword,
  getWalletAmount,
  uploadMiddleware,
  createNotificationDoctor,
  deleteNotification,
  getAllNotificationsDoctor,
  DoctorFollowUpRequests,
  acceptFollowUpRequest,
  rejectFollowUpRequest,
  startcall,
  endcall,
};