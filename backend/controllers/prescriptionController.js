const Prescription = require('../models/prescriptionsModel');
const Patient = require('../models/PatientModel');


const mongoose = require('mongoose');



// Get all prescriptions for myself
// const getPrescriptions = async (req, res) => {

//     const prescriptions = await Prescription.find({}).sort({ createdAt: -1 });
//     res.status(200).json(prescriptions);
// };

const getPrescriptions = async (req, res) => {
    try{
        const { username } = req.params;
        const prescriptions = await Prescription.find({ patientUsername: username });
        res.status(200).json(prescriptions);
        if(prescriptions.length === 0){
            return res.status(404).json({ error: "No prescriptions found for this patient" });
        }
    }
    catch(error){
        res.status(500).json({ error: "Internal Server Error" });
    }
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
        const prescription = await Prescription.create({ name, price, grams, date, doctor });
        res.status(200).json(prescription);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



const findMedicine = async (req, res) => {

    try {
        const { name } = req.body;
        const collection =  mongoose.connection.collection('medicines');
        const medicine = await collection.findOne({name});

        if (!medicine) {
            return res.status(404).json({ error: "No such medicine (NAME)" });
        }

        res.status(200).json(medicine);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
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
        console.log(prescriptionId);
        const prescriptions = await Prescription.findById(prescriptionId);

        if (!prescriptions) {
            return res.status(404).json({ error: 'No such prescription' });
        }

        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//FILTERRR BEGADDD
const filterPrescriptionn = async (req, res) => {
try {
    const {username} = req.params;
    const { date, doctor, filled } = req.query;
    const filter = {patientUsername: username};

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




//SPRINT 3 HAMOUDA CLINIC 
// Create new prescription for a specific patient
const createPrescriptionForPatient = async (req, res) => {
    const { username, medicines, date, doctor} = req.body;
    
    // Find the patient by their username
    const patient = await Patient.findOne({ username });

    

    if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
    }
    // check if all the medicines and dosage are available in the pharmacy platform
    const collection =  mongoose.connection.collection('medicines');
    console.log(medicines.name);
    for (let i = 0; i < medicines.length; i++) {
        const medicine = await collection.findOne({name: medicines[i].name});
       
        if (!medicine) {
            return res.status(404).json({ error: `No such medicine: ${medicines[i].name}` });
        }
        medicines[i].dosage = medicine.dosage;
        medicines[i].price = medicine.price;
    }
    // Add the patient's ID to the prescription data
    const prescriptionData = {
        medicines,
        date,
        doctor,
        patientUsername: username
    };

    // Create the prescription
    try {
        const prescription = await Prescription.create(prescriptionData);
        res.status(201).json(prescription);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



const deleteMedicineFromPrescription = async (req, res) => {
    const { prescriptionId, medicineName } = req.params;

    try {
        // Find the prescription by ID
        console.log(prescriptionId);
        const prescription = await Prescription.findById(prescriptionId);
        console.log(prescription);

        if (!prescription) {
            return res.status(404).json({ error: 'Prescription not found' });
        }

        // Find the index of the medicine in the prescription
        const medicineIndex = prescription.medicines.findIndex(medicine => medicine.name === medicineName);

        if (medicineIndex === -1) {
            return res.status(404).json({ error: `Medicine "${medicineName}" not found in the prescription` });
        }

        // Remove the medicine from the prescription
        prescription.medicines.splice(medicineIndex, 1);

        // Save the updated prescription
        const updatedPrescription = await prescription.save();

        res.status(200).json(updatedPrescription);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addMedicineToPrescription = async (req, res) => {
    const { prescriptionId} = req.params;
    const { medicineName} = req.body;
    try {
        // Find the prescription by ID
        console.log(prescriptionId);
        const prescription = await Prescription.findById(prescriptionId);
        console.log(prescription);

        if (!prescription) {
            return res.status(404).json({ error: 'Prescription not found' });
        }

        const collection =  mongoose.connection.collection('medicines');
        // Find the medicine by name
        const medicine = await collection.findOne({name: medicineName});
        if(!medicine){
            return res.status(404).json({ error: `Medicine "${medicineName}" not found in the pharmacy` });
        }
        if(prescription.medicines.includes(medicine)){
            return res.status(404).json({ error: `Medicine "${medicineName}" already exists in the prescription` });
        }
        // Add the medicine name, dosage and price to the prescription
        prescription.medicines.push({name: medicine.name, dosage: medicine.dosage, price: medicine.price});
        
       
       

        // Save the updated prescription
        const updatedPrescription = await prescription.save();

        res.status(200).json(updatedPrescription);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const checkMedicines = async (req, res) => {
    try {
        const collection = mongoose.connection.collection('medicines');
       
        const medicinesCursor = await collection.find({}, { projection: { name: 1 } });
        const medicinesArray = await medicinesCursor.toArray();

        res.status(200).json(medicinesArray);
    } catch (error) {
        console.error('Error fetching medicines:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



const updateMedicineDosage = async (req, res) => {
    const { prescriptionId, medicineName, newDosage } = req.params;
    

    try {
        // Find the prescription by ID
        const prescription = await Prescription.findById(prescriptionId);

        if (!prescription) {
            return res.status(404).json({ error: 'Prescription not found' });
        }

        // Find the medicine in the prescription
        const medicineToUpdate = prescription.medicines.find(medicine => medicine.name === medicineName);

        if (!medicineToUpdate) {
            return res.status(404).json({ error: `Medicine ${medicineName} not found in the prescription` });
        }

        // Update the dosage
        medicineToUpdate.dosage = newDosage;

        // Save the updated prescription
        const updatedPrescription = await prescription.save();

        res.status(200).json(updatedPrescription);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Get Prescriptions Doctor Side
const getPrescriptionsDoctor = async (req, res) => {
    try{
        const { username } = req.params;
        const prescriptions = await Prescription.find({ doctor: username });
        res.status(200).json(prescriptions);
        if(prescriptions.length === 0){
            return res.status(404).json({ error: "No prescriptions found for this patient" });
        }
    }
    catch(error){
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// handle check medicines







module.exports = {
    createPrescription,
    getSinglePrescription,
    getPrescriptions,
    deletePrescription,
    updatePrescription,
    filterPrescriptions,
    
    createPatient,
    getPrescription,
    filterPrescriptionsForPatient,
    viewPrescription,
    filterPrescriptionn,
    findMedicine,
    createPrescriptionForPatient,
    deleteMedicineFromPrescription,
    addMedicineToPrescription,
    updateMedicineDosage,
    getPrescriptionsDoctor,
    checkMedicines,
};
