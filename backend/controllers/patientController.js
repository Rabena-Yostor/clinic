const { mongo, default: mongoose } = require('mongoose')
const patient = require('../models/PatientModel')
const bcrypt =require('bcrypt')
const familyMember = require('../models/familyMemberModel')
const familyMemberModel = require('../models/familyMemberModel')
const HealthPackage = require('../models/healthPackageModel');
const Payment = require('../models/paymentModel'); 
const HealthPackageSubscription = require('../models/healthPackageSubModel');


const bodyParser = require('body-parser'); // Import body-parser
const express = require('express');
const app = express();


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

    const { username, name, email, password, dateOfBirth, gender, mobileNumber, EmergencyContactName,EmergencyContactNo} = req.body;


    // Check for missing fields
 if(!username || !name || !email || !password || !dateOfBirth || !gender || !mobileNumber || !EmergencyContactName|| !EmergencyContactNo) {
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
        dateOfBirth,
        gender,
        mobileNumber,
        EmergencyContactName,
        EmergencyContactNo
    });

    res.status(201).json({
        _id: newPatient.id,
        username: newPatient.username,
        name: newPatient.name,
        email: newPatient.email,
        dateOfBirth: newPatient.dateOfBirth,
        gender: newPatient.gender,
        mobileNumber: newPatient.mobileNumber,
        EmergencyContactName: newPatient.EmergencyContactName,
        EmergencyContactNo : newPatient.EmergencyContactNo
    });

} catch (error) {
    // Handle database or other errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}


};

// view the health packages 
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
    const { patientId } = req.query; // Use req.query instead of req.body to get query parameters
  
    try {
      const subscriptions = await HealthPackageSubscription.find({
        $or: [{ patient: patientId }, { familyMembers: patientId }],
        status: 'active' // Filter only active subscriptions
      }).populate('healthPackage').populate('familyMembers');
  
      res.status(200).json({ subscriptions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


//view subscription status 
const getSubscriptionStatus = async (req, res) => {
    const { patientId } = req.query;
  
    try {
      const subscriptions = await HealthPackageSubscription.find({
        $or: [{ patient: patientId }, { familyMembers: { $in: [patientId] } }],
      }).populate('familyMembers', 'name'); // Replace 'name' with the property you want to display for family members
  
      if (subscriptions.length === 0) {
        return res.status(404).json({ error: 'Patient ID not found' });
      }
      res.status(200).json({ subscriptions });
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



module.exports = {
    createPatient,
    getAllPatients,
    getPatient,
    deletePatient,
    updatePatient,
    filterAppointment,
    registerPatient,
    getHealthPackages,
    subscribeToHealthPackage,
    getSubscribedHealthPackages,
    getSubscriptionStatus,
    cancelSubscription,
    getFamilyMembers,
    addFamilyMember,
    filterAllApps,
        
}