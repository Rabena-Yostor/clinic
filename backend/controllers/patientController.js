const { mongo, default: mongoose } = require('mongoose')
const patient = require('../models/PatientModel')
const jwt = require('jsonwebtoken');
const bcrypt =require('bcrypt')
const familyMember = require('../models/familyMemberModel')
const familyMemberModel = require('../models/familyMemberModel')
const HealthRecord = require('../models/HealthRecordModel');

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
  const comparePasswords = async (plainTextPassword, hashedPassword) => {
    try {
      const match = await bcrypt.compare(plainTextPassword, hashedPassword);
      return match;
    } catch (error) {
      console.error('Error comparing passwords:', error);
      throw new Error('Error comparing passwords');
    }
  };

  module.exports = comparePasswords;
  
  const getHealthRecord = async (req, res) => {
    try {
        const { username, password } = req.body;
  
        // Validate patient credentials
        const validPatient = await patient.findOne({username,
        });
  
        if (!validPatient) {
          return res.status(401).json({ error: "Invalid patient credentials" });
        }
  
        // Check if the provided password matches the stored hashed password
        const passwordMatch = await bcrypt.compare(password, validPatient.password);
  
        if (!passwordMatch) {
          return res.status(401).json({ error: "Invalid patient credentials" });
        }
  
        // Fetch health records for the patient
        const healthRecords = await healthRecords.find({ patientId: validPatient._id });
  
        res.status(200).json(healthRecords);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
  };
  const maxAge = 3 * 24 * 60 * 60;
const createToken = (name) => {
    return jwt.sign({ name }, 'supersecret', {
        expiresIn: maxAge
    });
};

const signUp = async (req, res) => {
    const { username, name, email, password, dateOfBirth, gender, mobileNumber, EmergencyContactName, EmergencyContactNo, Appointment, Appointment_Status } = req.body;
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await patient.create({ username, name, email, password: hashedPassword, dateOfBirth, gender, mobileNumber, EmergencyContactName, EmergencyContactNo, Appointment, Appointment_Status });
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
        const user = await patient.findOne({ username: username });
        if (user) {
            const auth = await bcrypt.compare(password, user.password);
            if (auth) {
                const token = createToken(user.username);
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                res.status(200).json({ user })
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
const updatePatientPassword = async (req, res) => {
    const { username, currentPassword, newPassword } = req.body;

    try {
        // Retrieve the admin user by username
        const user = await patient.findOne({ username });

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
    const { username, Email } = req.body;

    try {
        const user = await patient.findOne({ username });

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
            text: "Your new Patient OTP is: ${otp}",
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
    getHealthRecord,
    signUp,
    login,
    logout,
    updatePatientPassword,
    sendOtpAndSetPassword
}