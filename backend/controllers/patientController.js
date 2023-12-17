const { mongo, default: mongoose } = require('mongoose')
const patient = require('../models/PatientModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const familyMember = require('../models/familyMemberModel')
const familyMemberModel = require('../models/familyMemberModel')
const followUpRequest = require('../models/followUpRequest')
const HealthRecord = require('../models/HealthRecordModel');
const nodemailer = require('nodemailer');
const HealthPackage = require('../models/healthPackageModel');
const Payment = require('../models/paymentModel'); 
const HealthPackageSubscription = require('../models/healthPackageSubModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser'); // Import body-parser
const express = require('express');
const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const Prescription = require('../models/prescriptionsModel');
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

    const { username, name, email, password, dateofbirth, gender, mobilenumber, emergencyfullname, emergencynumber } = req.body;


    // Check for missing fields
    if (!username || !name || !email || !password || !dateofbirth || !gender || !mobilenumber || !emergencyfullname || !emergencynumber) {
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
            emergencyfullname: newPatient.EmergencyContactName,
            emergencynumber: newPatient.EmergencyContactNo
        });

    } catch (error) {
        // Handle database or other errors
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }


};

const loginPatient = (req, res) => {
    res.json({ message: 'User logged in' })
}
/////////////////////////////END OF MALAK WAEL FOLDER


///////////////////////////// SAFINA FOLDER
const getFamilyMembers = async (req, res) => {
    try {
        const { username } = req.params;
        console.log({ username })
        const familyMembers = await familyMemberModel.find({ patientusername: username });
        console.log(familyMembers)

        if (familyMembers.length == 0) {
            return res.status(404).json({ message: 'no solution' });

        }
        res.status(200).json(familyMembers);
    } catch (error) {
        console.error('error:', error);
        res.status(500).json({ message: 'error' });
    }
}

const addFamilyMember = async (req, res) => {
    const { Name, National_id, age, gender, relation } = req.body
    try {
        const workout = await familyMemberModel.create({ Name, National_id, age, gender, relation })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
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
    const { username } = req.params;

    try {
        // Assuming you have a User model with a 'username' field
        const user = await patient.findOne({ username });

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
        const Patient = await patient.findOne({ username });

        if (!Patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Send the wallet amount in the response
        res.json({ walletAmount: Patient.WalletAmount });
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
//yarab
const signUp = async (req, res) => {
    const { username, name, email, password, dateOfBirth, gender, mobileNumber, EmergencyContactName, EmergencyContactNo, Appointment, Appointment_Status } = req.body;
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await patient.create({ username, name, email, password, dateOfBirth, gender, mobileNumber, EmergencyContactName, EmergencyContactNo, Appointment, Appointment_Status });
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
    console.log( password)
    try {
        const user = await patient.findOne({ username : username});
        console.log(user.password)
        if (user) {
            const auth = await bcrypt.compare(password, user.password)
            console.log(auth)
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
    const { username , Email } = req.body;
  
    try {
      const user = await patient.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Generate OTP
      const otp = generateNumericOTP(); // You may need to configure OTP generation options
  
      // Update user's password with the OTP
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(otp, salt);
      user.password = otp;
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
        text: `Your new patient OTP is: ${otp}`,
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
const getHealthPackages = async (req, res) => {
    try {
        const healthPackages = await HealthPackage.find({}, '-_id type price doctorSessionDiscount medicineDiscount familySubscriptionDiscount');
        res.status(200).json(healthPackages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//subscribe a health package

app.use(bodyParser.json());

const subscribeToHealthPackage = async (req, res) => {
    const { patientId, healthPackageId, familyMembers, paymentMethod , accountNumber } = req.body;

    try {
        // Check if the health package exists
        const healthPackage = await HealthPackage.findById(healthPackageId);
        if (!healthPackage) {
            return res.status(404).json({ error: 'Health package not found' });
        }

        // Calculate total price based on health package and family members
        let totalPrice = 0;

        // Logic to calculate total price based on health package type
        if (healthPackage.type === 'silver') {
            totalPrice = 3600;
        } else if (healthPackage.type === 'gold') {
            totalPrice = 6000;
        } else if (healthPackage.type === 'platinum') {
            totalPrice = 9000;
        } else {
            return res.status(400).json({ error: 'Invalid health package type' });
        }

        // Apply discounts based on the health package type
        const doctorSessionDiscount = healthPackage.type === 'silver' ? 0.4 : healthPackage.type === 'gold' ? 0.6 : 0.8;
        const medicineDiscount = healthPackage.type === 'silver' ? 0.2 : healthPackage.type === 'gold' ? 0.3 : 0.4;
        const familySubscriptionDiscount = healthPackage.type === 'silver' ? 0.1 : healthPackage.type === 'gold' ? 0.15 : 0.2;

        // Apply discounts to the total price
        totalPrice *= (1 - doctorSessionDiscount); // Apply doctor's session discount
        // Apply other discounts here...

        // Handle payment based on the chosen payment method
        let paymentStatus = 'completed'; // Placeholder for payment status
        // Implement payment processing logic based on paymentMethod (wallet or credit card)
        // Update paymentStatus based on the payment processing result

        // Assuming payment is successful, create a payment record
        const payment = new Payment({
            patient: patientId,
            healthPackage: healthPackageId,
            paymentMethod: paymentMethod,
            totalAmount: totalPrice,
            accountNumber: accountNumber,
            status: paymentStatus, // Set payment status (update based on payment processing)
        });

        await payment.save();

        // Assuming payment is successful, create a health package subscription record
        const HealthPackageSubscriptionInstance = new HealthPackageSubscription({
            patient: patientId,
            healthPackage: healthPackageId,
            familyMembers: familyMembers,
            totalAmount: totalPrice, // Adjust this based on your calculation logic
            paymentMethod: paymentMethod,
            accountNumber: accountNumber,
            status: 'active', // Set subscription status to 'active'
            subscriptionDate: new Date(), // Timestamp when the subscription was created
          });
      
          await HealthPackageSubscriptionInstance.save();

        res.status(200).json({ message: 'Health package subscribed successfully' });
    } catch (error) {
        console.error('Error subscribing to health package:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = subscribeToHealthPackage;



//view subscribed health package 

const getSubscribedHealthPackages = async (req, res) => {
    const { username } = req.params;

    try {
        // Assuming you have a function to find the patient's ID by username
        const patientInstance = await patient.findOne({ username });
        
        if (!patientInstance) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        try {
            const subscriptions = await HealthPackageSubscription.find({
                $or: [{ patient: patientInstance._id }, { familyMembers: patientInstance._id }],
                status: 'active' // Filter only active subscriptions
            }).populate('healthPackage').populate('familyMembers');
        
            res.status(200).json({ subscriptions });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};





//view subscription status 
const getSubscriptionStatus = async (req, res) => {
    const { username } = req.params;

    try {
        // Assuming you have a function to find the patient's ID by username
        const patientInstance = await patient.findOne({ username });

        if (!patientInstance) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        try {
            const subscriptions = await HealthPackageSubscription.find({
                $or: [{ patient: patientInstance._id }, { familyMembers: { $in: [patientInstance._id] } }],
            }).populate('familyMembers', 'name'); // Replace 'name' with the property you want to display for family members

            if (subscriptions.length === 0) {
                return res.status(404).json({ error: 'Patient ID not found' });
            }

            // Find the subscription that matches the patient's ID
            const patientSubscription = subscriptions.find(subscription => subscription.patient.toString() === patientInstance._id.toString());

            if (!patientSubscription) {
                return res.status(404).json({ error: 'Patient subscription not found' });
            }

            const {
                _id: subscriptionId,
                subscriptionDate,
                expirationDate,
                cancellationDate,
                status,
            } = patientSubscription;

            res.status(200).json({
                subscriptionId,
                subscriptionDate,
                expirationDate,
                cancellationDate,
                status,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



  


// cancel a subscription 
const cancelSubscription = async (req, res) => {
    const { patientId, subscriptionId } = req.body;

    try {
        // Check if the health package subscription exists
        const subscription = await HealthPackageSubscription.findById(subscriptionId);
        if (!subscription) {
            return res.status(404).json({ error: 'Health package subscription not found' });
        }

        // Check if the subscription belongs to the specified patient
        if (subscription.patient.toString() !== patientId) {
            return res.status(403).json({ error: 'Unauthorized access to the subscription' });
        }

        // Check if the subscription is already cancelled
        if (subscription.status === 'cancelled') {
            return res.status(400).json({ error: 'Subscription is already cancelled' });
        }

        // Update subscription status and cancellation date
        subscription.status = 'cancelled';
        subscription.cancellationDate = new Date();

        await subscription.save();

        res.status(200).json({ message: 'Health package subscription cancelled successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const updatePatientAppointments = async (req, res) => {
    const { username, appointments } = req.body;
  
    try {
      // Fetch the patient by username
  
      // Update the patient's appointments
      const patientOne = await patient.findOneAndUpdate(
        { username },
        { $push: { appointments: appointments } },
        { new: true } // Return the updated doctor document
      );
      console.log("patientupdated");
  
      // Save the updated patient
      await patientOne.save();
  
      // Respond with the updated appointments
      res.status(200).json({ appointments: patientOne.appointments });
    } catch (error) {
      console.error("Error updating patient appointments:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  const uploadDocument = async (req, res) => {
    const { username } = req.params;
    try {
        // Find the patient by username
        const p = await patient.findOne({ username });

        if (!p) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Assuming req.files contains the uploaded document
        const medicalHistoryFile = req.file;
        const medicalHistoryFileData = medicalHistoryFile.buffer;

        // Add the document to the medicalHistoryFiles array
        p.medicalHistoryFiles.push({
            medicalHistoryFileData
        });

        // Save the updated patient record
        await p.save();

        return res.status(200).json({ message: 'Document uploaded successfully' });
    } catch (error) {
        console.error('Error uploading document:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const removeDocument = async (req, res) => {
    const { username, documentId } = req.params;
    console.log({ username, documentId });
    try {
        const p = await patient.findOne({ username });
        if (!p) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        p.medicalHistoryFiles = p.medicalHistoryFiles.filter((file) => file._id.toString() !== documentId);
        await p.save();
        return res.status(200).json({ message: 'Document removed successfully' });
    } catch (error) {
        console.error('Error removing document:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
const uploadMiddlewareSingle = multer().single('medicalHistoryFile');



const getWallet = async (req, res) => {
    try {
      const { username } = req.params;
      console.log(username)
        
      const patientt = await patient.findOne({ username });
        console.log(patientt)
      if (!patientt) {
        return res.status(404).json({ message: 'Patient not found' });
      }
  
      return res.status(200).json({ wallet: patientt.WalletAmount });
    } catch (error) {
      return res.status(500).json({ message: 'Error getting wallet' });
    }
  };

const payWithWallet = async (req, res) => {
    try {
        const { prescriptionId, username } = req.params;
        const prescription = await Prescription.findById(prescriptionId);
        if (!prescription) {
          return res.status(404).json({ error: 'Prescription not found' });
        }
        
        if(prescription.filled){
            return res.status(400).json({ error: 'Prescription already filled' });
            }
        // Fetch the patient details
        const patientt = await patient.findOne({ username });
        if (!patientt) {
          return res.status(404).json({ error: 'Patient not found' });
        }
        
        // Calculate the total price of the prescription
        const totalPrice = prescription.medicines.reduce((total, medicine) => total + medicine.price, 0);
    
        // Check if the patient has sufficient funds
        console.log(patientt.WalletAmount)
        if (patientt.WalletAmount < totalPrice) {
          return res.status(400).json({ error: 'Insufficient funds in the wallet' });
        }
    
        // Deduct the prescription cost from the patient's wallet
        patientt.WalletAmount -= totalPrice;
        await patientt.save();
        console.log(patientt.WalletAmount)
        // Update the prescription status to 'Filled'
        prescription.filled = true;
        await prescription.save();
    
        return res.status(200).json({ message: 'Payment successful' });
    }
    catch (error) {
        console.error('Error processing payment:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
};

const filledYes = async (req, res) => {
    const { prescriptionId } = req.params;
    try {
      const prescription = await Prescription.findById(prescriptionId);
      if (!prescription) {
        return res.status(404).json({ error: 'Prescription not found' });
      }
  
      prescription.filled = true;
      await prescription.save();
  
      return res.status(200).json({ message: 'Prescription updated successfully' });
    } catch (error) {
      console.error('Error updating prescription:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const linkFamilyMember = async (req, res) => {
    const { username, familyMemberContact, relation } = req.body; // Changed from patientId to username

    try {
        // Validate input
        if (!username || !familyMemberContact || !relation) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if the relation is valid (WIFE, HUSBAND, CHILDREN)
        if (!['WIFE', 'HUSBAND', 'CHILDREN'].includes(relation.toUpperCase())) {
            return res.status(400).json({ error: 'Invalid relation type' });
        }

        // Find the requesting patient by username
        const requestingPatient = await patient.findOne({ username: username });
        if (!requestingPatient) {
            return res.status(404).json({ error: 'Requesting patient not found' });
        }

        // Find the family member by email or phone number
        const familyMemberPatient = await patient.findOne({ 
            $or: [{ email: familyMemberContact }, { mobileNumber: familyMemberContact }]
        });
        if (!familyMemberPatient) {
            return res.status(404).json({ error: 'Family member patient not found' });
        }

        // Update requesting patient's record to include family member
        // Similarly, update the family member's record
        // This assumes both patient records have a field for family members
        requestingPatient.familyMembers.push({ member: familyMemberPatient._id, relation });
        familyMemberPatient.familyMembers.push({ member: requestingPatient._id });

        await requestingPatient.save();
        await familyMemberPatient.save();
        

        res.status(200).json({ message: 'Family members linked successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const createAppointment = async (req, res) => {
    const { username } = req.body;
    const appointmentDate = req.body.appointmentDate;
    const doctorUsername = req.body.doctorUsername;

    if (!username) {
        return res.status(400).json({ error: 'Invalid username' });
    }

    try {
        // Check if the user exists based on the provided username
        const user = await patient.findOne({ username : username});

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }


        // Check if the appointment is already taken by the patient or family member
        const isAppointmentAvailable = !(user.appointments && user.appointments.filter(appt => appt && appt.toString() === appointmentDate.toString()).length > 0);

        if (!isAppointmentAvailable) {
            return res.status(400).json({ error: 'Selected appointment date is not available' });
        }

        // Add appointment information to the patient or family member object
        user.appointments = user.appointments || [];
        user.appointments.push({date : appointmentDate, status: 'upcoming', doctorUsername: doctorUsername});
        //user.Appointment_Status = 'upcoming'; // Assuming the default status is 'upcoming'

        // Save the updated patient or family member object with appointment details
        await user.save();

        console.log('Appointment created successfully');
        res.status(201).json({ message: 'Appointment created successfully', user });
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ error:`Internal Server Error: ${error.message}` });
    }
};

const createNotificationPatient = async (req, res) => {
    try {
        const { PatientName, message } = req.body;

        // Validate required fields
        if (!PatientName || !message) {
            return res.status(400).json({ message: 'Recipient ID, message are required' });
        }

        // Find the recipient
        const recipient = await patient.findOne({ username: PatientName });

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
const getAllNotificationsPatient = async (req, res) => {
    try {
        const { username } = req.body;

        // Validate the username
        if (!username) {
            return res.status(400).json({ message: 'Username is required in the request body' });
        }

        // Find the pharmacist by username
        const Patient = await patient.findOne({ username: username });
        console.log(Patient)

        if (!Patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Get all notifications for the pharmacist based on their ID
        const notifications = await Notification.find({ recipient_id: Patient._id });

        return res.status(200).json({ notifications });
    } catch (error) {
        console.error('Error getting notifications:', error);
        return res.status(500).json({ message: 'Error getting notifications' });
    }
};

const submitFollowUpRequest = async (req, res) => {
    const username = req.params.username;
    const { date} = req.body;
    const doctorUsername = req.body.doctorUsername;
    try{
        //create a new followUpRequest
        const newFollowUpRequest = new followUpRequest({
            username,
            date,
            doctorUsername
        });
        await newFollowUpRequest.save();
        return res.status(200).json({ message: 'Follow-up request submitted successfully' });
    }catch(error){
        console.error('Error submitting follow-up request:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

//start a call 
function generateUniqueCallId() {
    // Implement logic to generate a unique identifier (e.g., using UUID)
    // Replace this with your actual logic for generating unique call IDs
    return 'call_' + Math.random().toString(36).substr(2, 9);
  }
  function storeCallDetails(callId, doctorId, patientId) {
    console.log(`Storing call details: callId=${callId}, doctorId=${doctorId}, patientId=${patientId}`);
    // ... Your database storage logic here
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
    // ... Your logic to end the call here
  }
const endcall =async  (req, res) => {
    const { callId } = req.body;

// Update call status in the database or in-memory storage
endCall(callId);

// Send a response back to the client
res.json({ message: 'Call ended successfully.' });
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
    getWalletAmount,
    signUp,
    login,
    logout,
    updatePatientPassword,
    sendOtpAndSetPassword,
    getHealthPackages,
    subscribeToHealthPackage,
    getSubscribedHealthPackages,
    getSubscriptionStatus,
    cancelSubscription,
    updatePatientAppointments,
    uploadDocument,
    uploadMiddlewareSingle,
    removeDocument,
    getWallet,
    payWithWallet,
    filledYes,
    linkFamilyMember,
    createAppointment,
    createNotificationPatient,
    deleteNotification,
    getAllNotificationsPatient,
    submitFollowUpRequest,
    startcall,
    endcall,
}
