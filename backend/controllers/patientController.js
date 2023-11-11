const { mongo, default: mongoose } = require('mongoose')
const patient = require('../models/PatientModel')
const bcrypt =require('bcrypt')
const familyMember = require('../models/familyMemberModel')
const familyMemberModel = require('../models/familyMemberModel')

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
const viewPatientAccount = async (req, res) => {
    const { username } = req.params;
  
    try {
      const patient = await Patient.findOne({ username });
  
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found.' });
      }
  
      res.status(200).json(patient);
    } catch (error) {
      console.error('Error fetching patient account:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  const getHealthRecord = async (req, res) => {
    try {
        const { username, password } = req.body;
  
        // Validate patient credentials
        const validPatient = await Patient.findOne({
          Username: username,
        });
  
        if (!validPatient) {
          return res.status(401).json({ error: "Invalid patient credentials" });
        }
  
        // Check if the provided password matches the stored hashed password
        const passwordMatch = await validPatient.comparePassword(password);
  
        if (!passwordMatch) {
          return res.status(401).json({ error: "Invalid patient credentials" });
        }
  
        // Fetch health records for the patient
        const healthRecords = await HealthRecord.find({ patientId: validPatient._id });
  
        res.status(200).json(healthRecords);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
  };
  const login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if the user is a patient
      const newpatient = await patient.findOne({ username });
  
      if (newpatient) {
        // Compare the entered password with the stored password
        if (password === newpatient.password) {
          // Generate a JWT token for the patient
          const token = jwt.sign({ userId: newpatient._id, userType: 'patient' }, 'yourSecretKey', { expiresIn: '1h' });
          return res.status(200).json({ token, userType: 'patient' });
        }
      }
  
      // If no match found, authentication failed
      res.status(401).json({ message: 'Authentication failed' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
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
    viewPatientAccount,
    getHealthRecord,
    login
        
}