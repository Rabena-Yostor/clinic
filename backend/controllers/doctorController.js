const Doctor = require("../models/doctorModel");
const mongoose = require("mongoose");
const PendingDoctorRequest = require('../models/pendingdoctorModel');
const HealthRecord = require("../models/HealthRecordModel");
const bcrypt =require('bcrypt')

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

const createHealthRecord =async (req, res)=> {
  try {
    const { doctorUsername, doctorPassword, patientId } = req.body;

    // Validate doctor credentials
    const validDoctor = await Doctor.findOne({
      username: doctorUsername,
    });

    if (!validDoctor) {
      return res.status(401).json({ error: "Invalid doctor credentials" });
    }

    // Check if the provided password matches the stored hashed password
    const passwordMatch = await validDoctor.comparePassword(doctorPassword);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid doctor credentials" });
    }

    // Check if the doctor has permission to access the patient's records
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Check if the doctor is authorized to access the patient's records
    // This check can be based on your application's logic and requirements
    if (!validDoctor.hasPermissionToAccess(patient)) {
      return res.status(403).json({ error: "Permission denied" });
    }

    // Proceed to create health record
    const healthRecordData = req.body.healthRecordData;
    healthRecordData.patientId = patientId;

    const healthRecord = await HealthRecord.create(healthRecordData);
    res.status(201).json(healthRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getPatientHealthRecords=async (req, res)=> {
  try {
    const { doctorUsername, doctorPassword, patientId } = req.body;

    // Validate doctor credentials
    const validDoctor = await Doctor.findOne({
      username: doctorUsername,
    });

    if (!validDoctor) {
      return res.status(401).json({ error: "Invalid doctor credentials" });
    }

    // Check if the provided password matches the stored hashed password
    const passwordMatch = await validDoctor.comparePassword(doctorPassword);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid doctor credentials" });
    }

    // Check if the doctor has permission to access the patient's records
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Check if the doctor is authorized to access the patient's records
    // This check can be based on your application's logic and requirements
    if (!validDoctor.hasPermissionToAccess(patient)) {
      return res.status(403).json({ error: "Permission denied" });
    }

    // Fetch health records for the patient
    const healthRecords = await HealthRecord.find({ patientId });

    res.status(200).json(healthRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

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
  createHealthRecord,
  getPatientHealthRecords
};