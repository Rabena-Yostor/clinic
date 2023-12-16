const express = require('express')

const Doctor = require("../models/doctorModel");
const Notification = require("../models/ClinicNotificationModel");
const Patient = require("../models/PatientModel");
const nodemailer = require('nodemailer');
const {
    createDoctor,
    getDoctor,
    getDoctors,
    updateDoctor,
    deleteDoctor,
    submitRequest,
    updateDoctorAffiliation,
    updateDoctorEmail,
    updateDoctorHourlyRate,
    addDoctor,
    filterAllApps,
    getPatientsForDoctor,
    addHealthRecord,
  viewHealthRecords,
  viewDoctorAccount,
  login,
  updateDoctorPassword,
  getWalletAmount,
  signUp,
  sendOtpAndSetPassword,
  logout, 
  uploadMiddleware,
  createNotificationDoctor,
  deleteNotification,
  getAllNotificationsDoctor,
  DoctorFollowUpRequests,
  acceptFollowUpRequest,
  rejectFollowUpRequest,
  startcall,
  endcall

}= require('../controllers/doctorController')

const { getConversationDoctor ,sendMessageDoctor} = require('../controllers/conversationController');

const router = express.Router()

// get all doctors
router.get('/getAllDoctors', getDoctors)
// get a single Doctor
router.get('/getDoctor/:id', getDoctor)
// post a new Doctor
router.post('/createDoctor', createDoctor)
// delete a Doctor
router.delete('/deleteDoctor/:id', deleteDoctor)
// update a Doctor
router.patch('/updateDoctor/:id',updateDoctor)

//MALAK
router.post ('/submitRequest',uploadMiddleware, submitRequest)
//KHALED
router.put('/updateDoctorEmail', updateDoctorEmail)
router.put('/updateDoctorHourlyRate', updateDoctorHourlyRate)   
router.put('/updateDoctorAffiliation', updateDoctorAffiliation)

router.post('/addDoctor', addDoctor)

router.get('/filterAllApps/doctor', filterAllApps)
router.get('/getPatientsForDoctor', getPatientsForDoctor)

router.post('/addHealthRecord/:username', addHealthRecord)
router.get('/viewHealthRecords/:username', viewHealthRecords)

router.get('/wallet-amount/:username', getWalletAmount);
router.post('/signup', signUp)

//login
router.post('/login', login)

//logout
router.get('/logout', logout)

//update password
router.post('/updateDoctorPassword', updateDoctorPassword)

//send otp and set password
router.post('/sendOtpAndSetPassword', sendOtpAndSetPassword)

router.get("/getDoctorAppointments/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const doctor = await Doctor.findOne({ username });

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.status(200).json({ appointments: doctor.appointments });
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/addDoctorAppointment", async (req, res) => {
  const { username, appointment } = req.body;

  try {
    const doctor = await Doctor.findOneAndUpdate(
      { username },
      { $push: { appointments: appointment } },
      { new: true } // Return the updated doctor document
    );

    res.status(200).json({ appointments: doctor.appointments });

    //Send notification to Doctor with the new appointment date and and Patient name
    const message = `You have a ${appointment.status} appointment on ${appointment.date}`;
    const notifieddoctor = await Doctor.findOne({ username });
    const notification = new Notification({
      recipient_id: notifieddoctor._id,
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
      to: notifieddoctor.email,
      subject: 'A new Appointment has been added',
      text: `You have a ${appointment.status} appointment on ${appointment.date}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: 'Error sendingemail' });
      }
      res.status(200).json({ message: 'Email sent successfully' });
    });
    
  } catch (error) {
    console.error("Error adding doctor appointment:", error);
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
    console.log("Doctor query:", query);

    // Find the doctor in the database
    const doctor = await Doctor.findOne(query);

    // Log the doctor found (or not found)
    console.log("Doctor found:", doctor);

    if (!doctor) {
      console.log("Doctor not found with the provided username.");
      return res
        .status(404)
        .json({ error: "Doctor not found with the provided username." });
    }

    // Filter the appointments based on date and/or status
    let filteredAppointments = doctor.appointments;

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
router.post('/createNotificationDoctor', createNotificationDoctor);
router.delete('/deleteNotification/:notificationId', deleteNotification);
router.post('/getAllNotificationsDoctor', getAllNotificationsDoctor);

//conversation
router.post('/getconversationDoctor', getConversationDoctor);
router.post('/sendMessageDoctor', sendMessageDoctor);
//Peter Youssef
// Reschedule appointment by ID
router.patch("/rescheduleAppointment", async (req, res) => {
  const { appointmentId, newDate } = req.body;
  if (!appointmentId || !newDate) {
    return res.status(404).json({ message: "hihihi" });
  }
  try {
    const updatedAppointment = await Doctor.updateOne(
      { "appointments._id": appointmentId },
      {
        $set: {
          "appointments.$.date": newDate,
          "appointments.$.status": "rescheduled",
        },
      }
    );

    if (updatedAppointment.nModified === 0) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Fetch the updated doctor data
    const doctor = await Doctor.findOne({ "appointments._id": appointmentId });

    //Send notification to Doctor with the new appointment date and and Patient name
    const message = `Your appointment has been rescheduled to ${newDate}`;
    const notification = new Notification({
      recipient_id: doctor._id,
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
      to: doctor.email,
      subject: 'An Appointment has been rescheduled',
      text: `Your appointment has been rescheduled to ${newDate}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: 'Error sendingemail' });
      }
      res.status(200).json({ message: 'Email sent successfully' });
    });

    res.json(doctor);
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
    //get the appointment date
    const appointment = await Doctor.findOne({ "appointments._id": appointmentId });
    const date = appointment.appointments[0].date;
    console.log(date);

    const updatedAppointment = await Doctor.updateOne(
      { "appointments._id": appointmentId },
      {
        $set: {
          "appointments.$.status": "cancelled",
        },
      }
    );

    if (updatedAppointment.nModified === 0) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Fetch the updated doctor data
    const doctor = await Doctor.findOne({ "appointments._id": appointmentId });

    //Send notification to Doctor with the new appointment date and and Patient name
    const message = `Your appointment on ${date} has been cancelled`;
    const notification = new Notification({
      recipient_id: doctor._id,
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
      to: doctor.email,
      subject: 'An Appointment has been cancelled',
      text: `Your appointment on ${date} has been cancelled`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: 'Error sendingemail' });
      }
      res.status(200).json({ message: 'Email sent successfully' });
    });
    res.json(doctor);
  } catch (error) {
    console.error("Error rescheduling appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/doctorFollowUpRequests/:doctorUsername", DoctorFollowUpRequests)
router.post('/acceptFollowUpRequest/:requestId/:username', acceptFollowUpRequest)
router.delete('/rejectFollowUpRequest/:requestId', rejectFollowUpRequest)

router.post ('/startcall',startcall)
router.post ('/endcall',endcall)

module.exports = router 