import React, { useState, useEffect } from "react";
import axios from "axios";

const DoctorDash = () => {
  // State variables for doctor appointments
  const [doctorUsername, setDoctorUsername] = useState("");
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [newDoctorAppointmentDate, setNewDoctorAppointmentDate] = useState("");
  const [newDoctorAppointmentStatus, setNewDoctorAppointmentStatus] =
    useState("");

  // State variables for patient appointments
  const [patientUsername, setPatientUsername] = useState("");
  const [patientAppointments, setPatientAppointments] = useState([]);
  const [newPatientAppointmentDate, setNewPatientAppointmentDate] =
    useState("");
  const [newPatientAppointmentStatus, setNewPatientAppointmentStatus] =
    useState("");
  const [followUpDoctor, setFollowUpDoctor] = useState("");
  const [followUpPatient, setFollowUpPatient] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [followUpMessage, setFollowUpMessage] = useState("");

  // New state variables
  const [viewDoctorUsername, setViewDoctorUsername] = useState("");
  const [viewDoctorAppointments, setViewDoctorAppointments] = useState([]);

  // New state variables for viewing patient appointments
  const [viewPatientUsername, setViewPatientUsername] = useState("");
  const [viewPatientAppointments, setViewPatientAppointments] = useState([]);

  // State variables for filtering doctor appointments
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  // State variables for filtering patient appointments
  const [filterPatientDate, setFilterPatientDate] = useState("");
  const [filterPatientStatus, setFilterPatientStatus] = useState("");
  const [filteredPatientAppointments, setFilteredPatientAppointments] =
    useState([]);

  // Function to filter doctor appointments
  const filterDoctorAppointments = async () => {
    try {
      const response = await axios.post("/api/doctors/filterAppointments", {
        username: viewDoctorUsername,
        date: filterDate,
        status: filterStatus,
      });
      setFilteredAppointments(response.data.appointments);
    } catch (error) {
      console.error("Error filtering doctor appointments:", error);
    }
  };

  // Function to filter patient appointments
  const filterPatientAppointments = async () => {
    try {
      const response = await axios.post("/api/patient/filterAppointments", {
        username: viewPatientUsername,
        date: filterPatientDate,
        status: filterPatientStatus,
      });
      setFilteredPatientAppointments(response.data.appointments);
    } catch (error) {
      console.error("Error filtering patient appointments:", error);
    }
  };

  useEffect(() => {
    // Fetch existing doctor and patient appointments when the component mounts
    getDoctorAppointments();
    getPatientAppointments();
  }, []);

  const getDoctorAppointments = async () => {
    try {
      const response = await axios.get(
        `/api/doctors/getDoctorAppointments/${doctorUsername}`
      );
      setDoctorAppointments(response.data.appointments);
    } catch (error) {
      console.error("Error fetching doctor appointments:", error);
    }
  };

  const getPatientAppointments = async () => {
    try {
      const response = await axios.get(
        `/api/patient/getPatientAppointments/${patientUsername}`
      );
      setPatientAppointments(response.data.appointments);
    } catch (error) {
      console.error("Error fetching patient appointments:", error);
    }
  };

  const addDoctorAppointment = async () => {
    try {
      const response = await axios.post("/api/doctors/addDoctorAppointment", {
        username: doctorUsername,
        appointment: {
          date: newDoctorAppointmentDate,
          status: newDoctorAppointmentStatus,
        },
      });
      setDoctorAppointments(response.data.appointments);
      setNewDoctorAppointmentDate("");
      setNewDoctorAppointmentStatus("");
    } catch (error) {
      console.error("Error adding doctor appointment:", error);
    }
  };

  const addPatientAppointment = async () => {
    try {
      const response = await axios.post(
        "/api/patient/updatePatientAppointments",
        {
          username: patientUsername,
          appointments: [
            ...patientAppointments,
            {
              date: newPatientAppointmentDate,
              status: newPatientAppointmentStatus,
            },
          ],
        }
      );
      setPatientAppointments(response.data.appointments);
      setNewPatientAppointmentDate("");
      setNewPatientAppointmentStatus("");
    } catch (error) {
      console.error("Error adding patient appointment:", error);
    }
  };

  const scheduleFollowUp = () => {
    const message = `${followUpDoctor} just scheduled a follow-up with ${followUpPatient} on ${followUpDate}`;
    setFollowUpMessage(message);
  };

  const viewDoctorAppointmentsHandler = async () => {
    try {
      const response = await axios.get(
        `/api/doctors/getDoctorAppointments/${viewDoctorUsername}`
      );
      setViewDoctorAppointments(response.data.appointments);
    } catch (error) {
      console.error("Error fetching doctor appointments:", error);
    }
  };

  const viewPatientAppointmentsHandler = async () => {
    try {
      const response = await axios.get(
        `/api/patient/getPatientAppointments/${viewPatientUsername}`
      );
      setViewPatientAppointments(response.data.appointments);
    } catch (error) {
      console.error("Error fetching patient appointments:", error);
    }
  };

  return (
    <div>
      <h2>Doctor Dashboard</h2>
      <div>
        <label>Doctor Username:</label>
        <input
          type="text"
          onChange={(e) => setDoctorUsername(e.target.value)}
          value={doctorUsername}
        />
      </div>
      <div>
        <h3>Doctor Appointments</h3>
        <ul>
          {doctorAppointments.map((appointment, index) => (
            <li key={index}>
              Date: {appointment.date}, Status: {appointment.status}
            </li>
          ))}
        </ul>
        <label>Date:</label>
        <input
          type="datetime-local"
          onChange={(e) => setNewDoctorAppointmentDate(e.target.value)}
          value={newDoctorAppointmentDate}
        />
        <label>Status:</label>
        <select
          onChange={(e) => setNewDoctorAppointmentStatus(e.target.value)}
          value={newDoctorAppointmentStatus}
        >
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="rescheduled">Rescheduled</option>
        </select>
        <button type="button" onClick={addDoctorAppointment}>
          Add Doctor Appointment
        </button>
      </div>
      <div>
        <label>Patient Username:</label>
        <input
          type="text"
          onChange={(e) => setPatientUsername(e.target.value)}
          value={patientUsername}
        />
      </div>
      <div>
        <h3>Patient Appointments</h3>
        <ul>
          {patientAppointments.map((appointment, index) => (
            <li key={index}>
              Date: {appointment.date}, Status: {appointment.status}
            </li>
          ))}
        </ul>
        <label>Date:</label>
        <input
          type="datetime-local"
          onChange={(e) => setNewPatientAppointmentDate(e.target.value)}
          value={newPatientAppointmentDate}
        />
        <label>Status:</label>
        <select
          onChange={(e) => setNewPatientAppointmentStatus(e.target.value)}
          value={newPatientAppointmentStatus}
        >
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="rescheduled">Rescheduled</option>
        </select>
        <button type="button" onClick={addPatientAppointment}>
          Add Patient Appointment
        </button>
      </div>
      <div>
        <h3>Schedule Follow-Up</h3>
        <label>Doctor Name:</label>
        <input
          type="text"
          onChange={(e) => setFollowUpDoctor(e.target.value)}
          value={followUpDoctor}
        />
        <label>Patient Name:</label>
        <input
          type="text"
          onChange={(e) => setFollowUpPatient(e.target.value)}
          value={followUpPatient}
        />
        <label>Date:</label>
        <input
          type="datetime-local"
          onChange={(e) => setFollowUpDate(e.target.value)}
          value={followUpDate}
        />
        <button type="button" onClick={scheduleFollowUp}>
          Schedule Follow-Up
        </button>
        {followUpMessage && <p>{followUpMessage}</p>}
      </div>
      <div>
        <h3>View Doctor Appointments</h3>
        <label>Doctor Username:</label>
        <input
          type="text"
          onChange={(e) => setViewDoctorUsername(e.target.value)}
          value={viewDoctorUsername}
        />
        <button type="button" onClick={viewDoctorAppointmentsHandler}>
          View Doctor Appointments
        </button>
        <ul>
          {viewDoctorAppointments.map((appointment, index) => (
            <li key={index}>
              Date: {appointment.date}, Status: {appointment.status}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>View Patient Appointments</h3>
        <label>Patient Username:</label>
        <input
          type="text"
          onChange={(e) => setViewPatientUsername(e.target.value)}
          value={viewPatientUsername}
        />
        <button type="button" onClick={viewPatientAppointmentsHandler}>
          View Patient Appointments
        </button>
        <ul>
          {viewPatientAppointments.map((appointment, index) => (
            <li key={index}>
              Date: {appointment.date}, Status: {appointment.status}
            </li>
          ))}
        </ul>
      </div>
      {/* New section for filtering doctor appointments */}
      <div>
        <h3>Filter Doctor Appointments</h3>
        <label>Doctor Username:</label>
        <input
          type="text"
          onChange={(e) => setViewDoctorUsername(e.target.value)}
          value={viewDoctorUsername}
        />
        <label>Date:</label>
        <input
          type="date"
          onChange={(e) => setFilterDate(e.target.value)}
          value={filterDate}
        />
        <label>Status:</label>
        <select
          onChange={(e) => setFilterStatus(e.target.value)}
          value={filterStatus}
        >
          <option value="">Select Status</option>
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="rescheduled">Rescheduled</option>
        </select>
        <button type="button" onClick={filterDoctorAppointments}>
          Filter Doctor Appointments
        </button>
        <ul>
          {filteredAppointments.map((appointment, index) => (
            <li key={index}>
              Date: {appointment.date}, Status: {appointment.status}
            </li>
          ))}
        </ul>
      </div>
      {/* New section for filtering patient appointments */}
      <div>
        <h3>Filter Patient Appointments</h3>
        <label>Patient Username:</label>
        <input
          type="text"
          onChange={(e) => setViewPatientUsername(e.target.value)}
          value={viewPatientUsername}
        />
        <label>Date:</label>
        <input
          type="date"
          onChange={(e) => setFilterPatientDate(e.target.value)}
          value={filterPatientDate}
        />
        <label>Status:</label>
        <select
          onChange={(e) => setFilterPatientStatus(e.target.value)}
          value={filterPatientStatus}
        >
          <option value="">Select Status</option>
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="rescheduled">Rescheduled</option>
        </select>
        <button type="button" onClick={filterPatientAppointments}>
          Filter Patient Appointments
        </button>
        <ul>
          {filteredPatientAppointments.map((appointment, index) => (
            <li key={index}>
              Date: {appointment.date}, Status: {appointment.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorDash;
