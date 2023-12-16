const express = require('express');
const patient = require('../models/PatientModel')
const authenticatePatient = require('../Middleware/authenticatePatient');
const { requireAuth } = require('../Middleware/authMiddleware');
const nodemailer = require('nodemailer');
const Doctor = require('../models/doctorModel');
const Notification = require('../models/ClinicNotificationModel');
const{
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
    endcall,
    startcall
} = require('../controllers/patientController');

const { getConversationPatient, sendMessagePatient } = require('../controllers/conversationController');

const router = express.Router()

router.post('/createAppointment', createAppointment);
router.get('/getAllPatients',getAllPatients)

router.get('/getPatient/:id', getPatient)

router.post('/createPatient', createPatient)

router.delete('/deletePatient/:id',deletePatient)

router.patch('/updatePatient/:id', updatePatient)

router.get('/filterAppointment/:id',filterAppointment)

router.post('/registerPatient',registerPatient)

router.post('/loginPatient',loginPatient)

router.get('/getFamilyMembers/:username',getFamilyMembers)

router.post('/addFamilyMember',addFamilyMember)

router.get('/filterAppointmentPatient',filterAllApps)

router.get('/viewHealthRecords/:username', getHealthRecord);
router.get('/wallet-amount/:username', getWalletAmount);

router.get('/viewHealthPackage',getHealthPackages) 

router.post('/subscribeHealthPackage',subscribeToHealthPackage)

router.get('/getSubscribedHealthPackages/:username',getSubscribedHealthPackages)

router.get('/getSubscriptionStatus/:username',getSubscriptionStatus)
router.post('/cancelSubscription',cancelSubscription)

//sign up
router.post('/signup',signUp)

//login
router.post('/login',login)

//logout
router.get('/logout',logout)

//update password
router.post('/updatePatientPassword',updatePatientPassword)

//send otp and set password
router.post('/sendOtpAndSetPassword',sendOtpAndSetPassword)
router.post('/createNotificationPatient', createNotificationPatient);

// Delete a notification for a patient
router.delete('/deleteNotification/:notificationId', deleteNotification);

// Get all notifications for a patient
router.post('/getAllNotificationsPatient', getAllNotificationsPatient);

//Conversation
router.post('/getConversationPatient', getConversationPatient);
router.post('/sendMessagePatient', sendMessagePatient);


// New route to handle updating patient appointments
router.post("/updatePatientAppointments", updatePatientAppointments);

router.get("/getPatientAppointments/:username", async (req, res) => {
    const { username } = req.params;
  
    try {
      const doctor = await patient.findOne({ username });
  
      if (!doctor) {
        return res.status(404).json({ error: "Patient not found" });
      }
  
      res.status(200).json({ appointments: doctor.appointments });
    } catch (error) {
      console.error("Error fetching patient appointments:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  router.post("/filterAppointments", async (req, res) => {
    try {
      console.log("Request received:", req.body);
  
      const { username, date, status } = req.body;
  
      // Check if the username is correctly received
      console.log("Username from request:", username);
  
      // Construct the query to find the doctor
      const query = { username };
  
      // Log the query
      console.log("Patient query:", query);
  
      // Find the doctor in the database
      const patientOne = await patient.findOne(query);
  
      // Log the doctor found (or not found)
      console.log("Doctor found:", patientOne);
  
      if (!patientOne) {
        console.log("Doctor not found with the provided username.");
        return res
          .status(404)
          .json({ error: "Doctor not found with the provided username." });
      }
  
      // Filter the appointments based on date and/or status
      let filteredAppointments = patientOne.appointments;
  
      if (date) {
        filteredAppointments = filteredAppointments.filter(
          (appointment) => appointment.date.toISOString().split("T")[0] === date
        );
      }
  
      if (status) {
        filteredAppointments = filteredAppointments.filter(
          (appointment) => appointment.status === status
        );
      }
  
      res.json({ appointments: filteredAppointments });
    } catch (error) {
      console.error("Error filtering doctor appointments:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  router.post('/uploadDocument/:username', uploadMiddlewareSingle, uploadDocument);

router.delete('/removeDocument/:username/:documentId', removeDocument);

router.get('/medicalHistoryFiles/:username', async (req, res) => {
    try {

        const {username} = req.params // Replace with your authentication logic
        console.log(username)
        const loggedinPatient = await patient.findOne({ username });

        if (!loggedinPatient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        const medicalHistoryFiles = loggedinPatient.medicalHistoryFiles || [];
        res.status(200).json(medicalHistoryFiles);
    } catch (error) {
        console.error('Error fetching medical history files:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/getWallet/:username', getWallet);
router.put('/pay-with-wallet/:prescriptionId/:username', payWithWallet);
router.put('/filledYes/:prescriptionId', filledYes);
router.post('/linkFamilyMember', linkFamilyMember);

//Peter Youssef
// Reschedule appointment by ID
router.patch("/rescheduleAppointment", async (req, res) => {
  const { appointmentId, newDate } = req.body;
  if (!appointmentId || !newDate) {
    return res.status(404).json({ message: "hihihi" });
  }
  try {
    const updatedAppointment = await patient.updateOne(
      { "appointments._id": appointmentId },
      {
        $set: {
          "appointments.$.date": newDate,
          "appointments.$.status": "rescheduled",
        },
      }
    );
    updatedAppointment.nModified;

    if (updatedAppointment.nModified === 0) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Fetch the updated doctor data
    const PatientR = await patient.findOne({
      "appointments._id": appointmentId,
    });
    //Send notification to Doctor with the new appointment date and and Patient name
    const message = `Your appointment has been rescheduled to ${newDate}`;
    const notification = new Notification({
      recipient_id: PatientR._id,
      message,
    });
    await notification.save();

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
      to: PatientR.email,
      subject: 'An Appointment has been rescheduled',
      text: `Your appointment has been rescheduled to ${newDate}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: 'Error sendingemail' });
      }
      res.status(200).json({ message: 'Email sent successfully' });
    });

    res.json(PatientR);
  } catch (error) {
    console.error("Error rescheduling appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Cancel appointment by ID
router.patch("/cancelAppointment", async (req, res) => {
  const { appointmentId } = req.body;
  if (!appointmentId) {
    return res.status(404).json({ message: "hihihi" });
  }
  try {
    //get the date of the appointment
    const updatedAppointment = await patient.updateOne(
      { "appointments._id": appointmentId },
      {
        $set: {
          "appointments.$.status": "cancelled",
        },
      }
    );
    updatedAppointment.nModified;

    if (updatedAppointment.nModified === 0) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Fetch the updated patient data
    const PatientR = await patient.findOne({
      "appointments._id": appointmentId,
    });
     //Send notification to Doctor with the new appointment date and and Patient name
     const message = `Your appointment has been cancelled, we are sorry for the inconvenience.`;
     const notification = new Notification({
       recipient_id: PatientR._id,
       message,
     });
     await notification.save();

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
      to: PatientR.email,
      subject: 'An Appointment has been cancelled',
      text: `Your appointment has been cancelled, we are sorry for the inconvenience.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: 'Error sendingemail' });
      }
      res.status(200).json({ message: 'Email sent successfully' });
    });
    res.json(PatientR);
  } catch (error) {
    console.error("Error rescheduling appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/followUpRequest/:username", submitFollowUpRequest);
router.post ('/startcall',startcall)
router.post ('/endcall',endcall)

module.exports = router