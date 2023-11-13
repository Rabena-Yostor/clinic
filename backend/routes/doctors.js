const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctorModel");

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
} = require("../controllers/doctorController");

// get all doctors
router.get("/getAllDoctors", getDoctors);
// get a single Doctor
router.get("/getDoctor/:id", getDoctor);
// post a new Doctor
router.post("/createDoctor", createDoctor);
// delete a Doctor
router.delete("/deleteDoctor/:id", deleteDoctor);
// update a Doctor
router.patch("/updateDoctor/:id", updateDoctor);

// MALAK
router.post("/submitRequest", submitRequest);
// KHALED
router.put("/updateDoctorEmail", updateDoctorEmail);
router.put("/updateDoctorHourlyRate", updateDoctorHourlyRate);
router.put("/updateDoctorAffiliation", updateDoctorAffiliation);

router.post("/addDoctor", addDoctor);

router.get("/filterAllApps/doctor", filterAllApps);

// Updated route to accept username parameter
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

// Updated route to accept username parameter
router.get("/getPatientsForDoctor/:username", getPatientsForDoctor);

// Add Doctor Appointment
router.post("/addDoctorAppointment", async (req, res) => {
  const { username, appointment } = req.body;

  try {
    const doctor = await Doctor.findOneAndUpdate(
      { username },
      { $push: { appointments: appointment } },
      { new: true } // Return the updated doctor document
    );

    res.status(200).json({ appointments: doctor.appointments });
  } catch (error) {
    console.error("Error adding doctor appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ...

// Route for filtering doctor appointments
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

// ...

module.exports = router;
