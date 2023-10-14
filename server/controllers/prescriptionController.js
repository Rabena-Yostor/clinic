const Prescription = require('../models/prescriptionsModel');
const Patient = require('../models/patientModel');

const mongoose = require('mongoose');

// Get all prescriptions
const getPrescriptions = async (req, res) => {
    const prescriptions = await Prescription.find({}).sort({ createdAt: -1 });
    res.status(200).json(prescriptions);
};

// Get single prescription
const getSinglePrescription = async (req, res) => {
    const { name } = req.body;
    const prescription = await Prescription.findOne({ name: name });
    if (!prescription) {
        return res.status(404).json({ error: "No such prescription (NAME)" });
    }
    res.status(200).json(prescription);
};

// Create new prescription
const createPrescription = async (req, res) => {
    const { name, price, grams, date, doctor, filled } = req.body;
    // Add prescription to the database
    try {
        const prescription = await Prescription.create({ name, price, grams, date, doctor, filled });
        res.status(200).json(prescription);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Create new prescription for a specific patient
const createPrescriptionForPatient = async (req, res) => {
    const { username, name, price, grams, date, doctor, filled } = req.body;

    // Find the patient by their username
    const patient = await Patient.findOne({ username });
    console.log('Searching for patient with username:', username);

    if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
    }

    // Add the patient's ID to the prescription data
    const prescriptionData = {
        name,
        price,
        grams,
        date,
        doctor,
        filled,
        patientUsername: username // Match 'username' to the property in the schema
    };

    // Create the prescription
    try {
        const prescription = await Prescription.create(prescriptionData);
        res.status(201).json(prescription);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};






//CREATE PATIENT



const createPatient = async (req, res) => {
    const { username, name, email, password, dateOfBirth, gender, mobileNumber, EmergencyContactName, EmergencyContactNo } = req.body;

    // Add patient to the database
    try {
        const patient = await Patient.create({
            username,
            name,
            email,
            password,
            dateOfBirth,
            gender,
            mobileNumber,
            EmergencyContactName,
            EmergencyContactNo
        });
        res.status(201).json(patient); // Use status code 201 for resource creation
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// GET A PRESCRIPTION OF A SPECIFIC USER
const getPrescription = async (req, res) => {
    try {
        const { username } = req.params;
        const prescriptions = await Prescription.find({ patientUsername: username });

        if (prescriptions.length === 0) {
            return res.status(404).json({ error: 'No prescriptions found for this patient.' });
        }

        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

};








// Delete a prescription
const deletePrescription = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such Prescription" });
    }

    const prescription = await Prescription.findOneAndDelete({ _id: id });

    if (!prescription) {
        return res.status(404).json({ error: "No such prescription" });
    }

    res.status(200).json(prescription);
};

// Update a prescription
const updatePrescription = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such Prescription" });
    }

    const prescription = await Prescription.findOneAndUpdate({ _id: id }, {
        ...req.body
    });

    if (!prescription) {
        return res.status(404).json({ error: "No such prescription" });
    }

    res.status(200).json(prescription);
};

// Filter prescriptions based on date/doctor/filled/unfilled
const filterPrescriptions = async (req, res) => {
    try {
        const { date, doctor, filled } = req.body;
        const filter = {};

        if (date) {
            // Use $or operator for logical OR condition
            filter.$or = [{ date: date }];
        }
        if (doctor) {
            // Use $or operator for logical OR condition
            filter.$or = filter.$or || [];
            filter.$or.push({ doctor: doctor });
        }
        if (filled !== undefined) {
            // Use $or operator for logical OR condition
            filter.$or = filter.$or || [];
            filter.$or.push({ filled: filled === true });
        }

        const prescriptions = await Prescription.find(filter);

        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(404).json({ error: "Prescription not found!" });
    }
};

const filterPrescriptionsForPatient = async (req, res) => {
    try {
        const { username } = req.params; // Extract the patient's username from the URL parameters
        const { date, doctor, filled } = req.query; // Use query parameters for filtering

        const filter = { patientUsername: username }; // Start with the patient's username

        if (date) {
            filter.date = new Date(date); // Add date filter
        }

        if (doctor) {
            filter.doctor = doctor; // Add doctor filter
        }

        if (filled !== undefined) {
            filter.filled = filled === 'true'; // Add filled/unfilled filter and convert to boolean
        }

        const prescriptions = await Prescription.find(filter);

        if (prescriptions.length === 0) {
            return res.status(404).json({ error: 'No prescriptions found for this patient and filter criteria.' });
        }

        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// View prescription
const viewPrescription = async (req, res) => {
    try {
        const { prescriptionId } = req.params;
        
        const prescription = await Prescription.findById(prescriptionId);

        if (!prescription) {
            return res.status(404).json({ error: 'No such prescription' });
        }

        res.status(200).json(prescription);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//FILTERRR BEGADDD
const filterPrescriptionn = async (req, res) => {
try {
    const { date, doctor, filled } = req.query;
    const filter = {};

    if (date) {
      filter.date = date;
    }
    if (doctor) {
      filter.doctor = doctor;
    }
    if (filled !== undefined) {
      filter.filled = filled;
    }

    const prescriptions = await Prescription.find(filter);
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
module.exports = {
    createPrescription,
    getSinglePrescription,
    getPrescriptions,
    deletePrescription,
    updatePrescription,
    filterPrescriptions,
    createPrescriptionForPatient,
    createPatient,
    getPrescription,
    filterPrescriptionsForPatient,
    viewPrescription,
    filterPrescriptionn,
};
