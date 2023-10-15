const doctorModel = require('../Schemas/doctor.js');
const { default: mongoose } = require('mongoose');

const createDoctor = async (req, res) => {
    const { DoctorID, Name, Email, HourlyRate, Affiliation } = req.body;
    const newDoctor = new doctorModel({ DoctorID, Name, Email, HourlyRate, Affiliation });
    try {
        await newDoctor.save();
        res.status(201).json(newDoctor);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const getDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getDoctor = async (req, res) => {
    const { DoctorID } = req.body;
    try {
        const doctor = await doctorModel.findOne({ DoctorID: DoctorID });
        res.status(200).json(doctor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateDoctorEmail = async (req, res) => {
     const { DoctorID, Email } = req.body;
    try {
        const doctor = await doctorModel.findOne({ DoctorID: DoctorID });
        doctor.Email = Email;
        doctor.save();
        res.status(200).json(doctor);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateDoctorHourlyRate = async (req, res) => {
    const { DoctorID, HourlyRate } = req.body;
    try {
        const doctor = await doctorModel.findOne({ DoctorID: DoctorID });
        doctor.HourlyRate = HourlyRate;
        doctor.save();
        res.status(200).json(doctor);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateDoctorAffiliation = async (req, res) => {
    const { DoctorID, Affiliation } = req.body;
    try {
        const doctor = await doctorModel.findOne({ DoctorID: DoctorID });
        doctor.Affiliation = Affiliation;
        doctor.save();
        res.status(200).json(doctor);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = {updateDoctorEmail, updateDoctorHourlyRate, updateDoctorAffiliation, createDoctor, getDoctors, getDoctor};