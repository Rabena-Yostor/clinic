const Doctor = require("../models/doctorModel");
const mongoose = require("mongoose");
const Patient= require('../models/PatientModel')
const PendingDoctorRequest = require('../models/pendingdoctorModel');
const HealthRecord = require("../models/HealthRecordModel");
const bcrypt =require('bcrypt')
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up storage for uploaded files
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
          dateofbirth,
          hourlyrate,
          affiliation,
          educationalbackground,
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
  const { patientId, bloodPressure, heartRate, allergies, medications } = req.body;

  try {
    const healthRecord = await HealthRecord.create({
      patientId,
      bloodPressure,
      heartRate,
      allergies,
      medications,
    });

    res.status(201).json({ healthRecord });
  } catch (error) {
    console.error('Error creating health record:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// View health records for a specific patient
const viewHealthRecords = async (req, res) => {
  const { patientId } = req.params;

  try {
    const healthRecords = await HealthRecord.find({ patientId });

    if (healthRecords.length === 0) {
      return res.status(404).json({ message: 'No health records found for the specified patient' });
    }

    res.status(200).json(healthRecords);
  } catch (error) {
    console.error('Error fetching health records:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

///////////////////////////////////////// END OF HANA'S FOLDER
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
  uploadMiddleware,
};
