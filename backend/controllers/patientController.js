const { mongo, default: mongoose } = require('mongoose')
//const patient = require('../models/PatientModel')
const bcrypt =require('bcrypt')
const familyMember = require('../models/familyMemberModel')
const familyMemberModel = require('../models/familyMemberModel')
const Doctor = require('../models/doctorModel')

const Patient = require('../models/PatientModel'); // Adjust the path based on your project structure


// get all patients
const getAllPatients = async (req, res) => {
    const patients = await patient.find({})
    res.status(200).json(patients)
}

// get a specific patient(Search for one)
const getPatient = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No Patient' })
    }
    const { name } = req.body;
    const specificPatient = await patient.find({ name: { $regex: new RegExp(name, 'i') } })

    if (!specificPatient) {
        return res.status(404).json({ error: 'No Patient' })
    }
    res.status(200).json(specificPatient)

}

// create a patient
const createPatient = async (req, res) => {
    const { username, name, email, password, dateOfBirth, gender, mobileNumber, EmergencyContactName, EmergencyContactNo, Appointment, Appointment_Status } = req.body
    try {
        const newPatient = await patient.create({ username, name, email, password, dateOfBirth, gender, mobileNumber, EmergencyContactName, EmergencyContactNo, Appointment, Appointment_Status })
        res.status(200).json(newPatient)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete a patient
const deletePatient = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No Patient' })
    }
    const deletePatient = await patient.findOneAndDelete({ _id: id })

    if (!deletePatient) {
        return res.status(400).json({ error: 'No Patient' })
    }

    res.status(200).json(deletePatient)
}

//update patient info
const updatePatient = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No Patient' })
    }
    const updatePatient = await patient.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!updatePatient) {
        return res.status(400).json({ error: 'No Patient' })
    }

    res.status(200).json(updatePatient)
}

const filterAppointment = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No Patient' })
    }
    const { status } = req.body;
    const specificPatient = await patient.find({ Appointment_Status: { $regex: new RegExp(status, 'i') } })

    if (!specificPatient) {
        return res.status(404).json({ error: 'No Patient' })
    }
    res.status(200).json(specificPatient)
};

////MALAK WAEL FOLDER

const registerPatient = async (req, res) => {
    console.log('Received request body:', req.body); 

    const { username, name, email, password, dateofbirth, gender, mobilenumber, emergencyfullname,emergencynumber} = req.body;


    // Check for missing fields
 if(!username || !name || !email || !password || !dateofbirth || !gender || !mobilenumber || !emergencyfullname|| !emergencynumber) {
        return res.status(400).json({ error: 'Please provide all fields' });
    }

    // Check if patient with the same email exists
   
try {

 const patientExists = await patient.findOne({ email });

 if (patientExists) {
        return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password securely before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new patient instance with hashed password
    const newPatient = await patient.create({
        username,
        name,
        email,
        password: hashedPassword,
        dateofbirth,
        gender,
        mobilenumber,
        emergencyfullname,
        emergencynumber
    });

    res.status(201).json({
        _id: newPatient.id,
        username: newPatient.username,
        name: newPatient.name,
        email: newPatient.email,
        dateofbirth: newPatient.dateOfBirth,
        gender: newPatient.gender,
        mobilenumber: newPatient.mobileNumber,
        emergencyfullname : newPatient.EmergencyContactName,
        emergencynumber : newPatient.EmergencyContactNo
    });

} catch (error) {
    // Handle database or other errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}


};

const loginPatient = (req, res) => {
    res.json({message: 'User logged in'})
}
/////////////////////////////END OF MALAK WAEL FOLDER


///////////////////////////// SAFINA FOLDER
const getFamilyMembers= async(req, res)=>{
    try {
        const{username}= req.params;
        console.log({username})
        const familyMembers= await familyMemberModel.find({patientusername: username});
        console.log(familyMembers)

        if(familyMembers.length==0){
            return res.status(404).json({message:'no solution'});
            
        }
        res.status(200).json(familyMembers);
    } catch (error) {
        console.error('error:',error);
        res.status(500).json({message:'error'});
    }
}

const addFamilyMember = async (req, res) =>{
    const {Name,National_id, age, gender, relation}=req.body
try {
    const workout= await familyMemberModel.create({Name,National_id, age, gender, relation})
    res.status(200).json(workout)
} catch (error) {
    res.status(400).json({error: error.message})
}
}
////////////////////////////// END SAFINA


//////////////////////////////// HANA FOLDER 
const filterAllApps = async (req, res) => {

    try {
        const { date, status } = req.params;

        const filter = {};

        if (date) {
            filter.Appointment = date;
        }

        if (status) {
            filter.Appointment_Status = status;
        }

        const filteredAppointments = await patient.find(filter);

        if (filteredAppointments.length === 0) {
            return res.status(404).send('No matching appointments found');
        }

        res.send(filteredAppointments);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};



// patientController.js
const createAppointment = async (req, res) => {
    const { patientId, familyMemberId, appointmentDate } = req.body;
    console.log('Received Appointment Date:', appointmentDate);

    try {
        // Check if the patient or family member exists
        let user;

        if (patientId) {
            user = await Patient.findById(patientId);
        } else if (familyMemberId) {
            // Assuming family members are stored in the FamilyMember model
            const familyMember = await FamilyMember.findById(familyMemberId).populate('patient');

            if (!familyMember) {
                return res.status(404).json({ error: 'Family member not found' });
            }

            user = familyMember.patient;
        } else {
            return res.status(400).json({ error: 'Invalid request' });
        }

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log('User:', user);
        const isAppointmentAvailable = !(user.zz && user.zz.filter(appt => appt).includes(appointmentDate) || user.familyMembers.some(member => member.zz && member.zz.filter(appt => appt).includes(appointmentDate)));

        if (!isAppointmentAvailable) {
            console.log('Selected appointment date is not available');
            return res.status(400).json({ error: 'Selected appointment date is not available' });
        }
        
        console.log('User Appointments after:', user.zz);
        
  // Add appointment information to the patient or family member object
        user.zz = user.zz || [];
        user.zz.push(appointmentDate);
        user.Appointment_Status = 'upcoming'; // Assuming the default status is 'upcoming'

        // Save the updated patient or family member object with appointment details
        await user.save();

        console.log('Appointment created successfully');
        res.status(201).json({ message: 'Appointment created successfully', user });
    }catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
};


  

module.exports = {
    createPatient,
    getAllPatients,
    getPatient,
    deletePatient,
    updatePatient,
    filterAppointment,
    registerPatient,
    loginPatient,
    getFamilyMembers,
    addFamilyMember,
    filterAllApps,
    
    createAppointment
    
}