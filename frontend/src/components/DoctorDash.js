import React, { useState, useEffect } from "react";
import axios from "axios";

const DoctorDash = () => {
  const DoctorUsername = localStorage.getItem("username");
  // State variables for rescheduling appointments
  const [appointmentsForReschedule, setAppointmentsForReschedule] = useState(
    []
  );
  const [selectedAppointment, setSelectedAppointment] = useState("");
  const [newAppointmentDate, setNewAppointmentDate] = useState("");

  // State variables for doctor appointments
  //const [doctorUsername, setDoctorUsername] = useState("");
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [newDoctorAppointmentDate, setNewDoctorAppointmentDate] = useState("");
  const [newDoctorAppointmentStatus, setNewDoctorAppointmentStatus] =
    useState("");

  // State variables for patient appointments

  const [followUpDoctor, setFollowUpDoctor] = useState("");
  const [followUpPatient, setFollowUpPatient] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [followUpMessage, setFollowUpMessage] = useState("");

  // New state variables
  //const [viewDoctorUsername, setViewDoctorUsername] = useState("");
  const [viewDoctorAppointments, setViewDoctorAppointments] = useState([]);

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
    const viewDoctorUsername = localStorage.getItem("username");

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
  useEffect(() => {
    // Fetch existing doctor and patient appointments when the component mounts
    getDoctorAppointments();
  }, []);

  const getDoctorAppointments = async () => {
    const doctorUsername = localStorage.getItem("username");

    try {
      const response = await axios.get(
        `/api/doctors/getDoctorAppointments/${doctorUsername}`
      );
      setDoctorAppointments(response.data.appointments);
    } catch (error) {
      console.error("Error fetching doctor appointments:", error);
    }
  };

  const addDoctorAppointment = async () => {
    const doctorUsername = localStorage.getItem("username");

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
      console.log("Doctor Appointments:", doctorAppointments);
    } catch (error) {
      console.error("Error adding doctor appointment:", error);
    }
  };

  const scheduleFollowUp = () => {
    const followUpDoctor = localStorage.getItem("username");

    const message = `${followUpDoctor} just scheduled a follow-up with ${followUpPatient} on ${followUpDate}`;
    setFollowUpMessage(message);
  };

  const viewDoctorAppointmentsHandler = async () => {
    const viewDoctorUsername = localStorage.getItem("username");

    try {
      const response = await axios.get(
        `/api/doctors/getDoctorAppointments/${viewDoctorUsername}`
      );
      setViewDoctorAppointments(response.data.appointments);
    } catch (error) {
      console.error("Error fetching doctor appointments:", error);
    }
  };

  // Fetch appointments for rescheduling when the component mounts
  useEffect(() => {
    getAppointmentsForReschedule();
  }, []);

  // Function to fetch appointments for rescheduling
  const getAppointmentsForReschedule = async () => {
    const doctorUsername = localStorage.getItem("username");

    try {
      const response = await axios.get(
        `/api/doctors/getDoctorAppointments/${doctorUsername}`
      );
      setAppointmentsForReschedule(response.data.appointments);
    } catch (error) {
      console.error("Error fetching appointments for reschedule:", error);
    }
  };
  // Function to handle rescheduling of appointments
  const rescheduleAppointment = async () => {
    if (!selectedAppointment || !newAppointmentDate) {
      alert("Please select an appointment and enter a new date.");
      return;
    }

    try {
      const response = await axios.patch(`/api/doctors/rescheduleAppointment`, {
        newDate: newAppointmentDate,
        appointmentId: selectedAppointment._id,
      });

      // Update the local state with the updated appointment
      const updatedAppointments = doctorAppointments.map((appointment) =>
        appointment._id === selectedAppointment._id
          ? response.data
          : appointment
      );
      setDoctorAppointments(updatedAppointments);

      // Clear the selected appointment and new date fields
      setSelectedAppointment("");
      setNewAppointmentDate("");

      alert("Appointment rescheduled successfully!");
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
      alert("Error rescheduling appointment. Please try again.");
    }
  };

  // Fetch appointments for cancelling when the component mounts
  useEffect(() => {
    getAppointmentsForCancel();
  }, []);

  // Function to fetch appointments for cancelling
  const getAppointmentsForCancel = async () => {
    const doctorUsername = localStorage.getItem("username");

    try {
      const response = await axios.get(
        `/api/doctors/getDoctorAppointments/${doctorUsername}`
      );
      setAppointmentsForReschedule(response.data.appointments);
    } catch (error) {
      console.error("Error fetching appointments for cancelling:", error);
    }
  };
  // Function to handle cancelling of appointments
  const cancelAppointment = async () => {
    if (!selectedAppointment) {
      alert("Please select an appointment and enter a new date.");
      return;
    }

    try {
      const response = await axios.patch(`/api/doctors/cancelAppointment`, {
        appointmentId: selectedAppointment._id,
      });

      // Update the local state with the updated appointment
      const updatedAppointments = doctorAppointments.map((appointment) =>
        appointment._id === selectedAppointment._id
          ? response.data
          : appointment
      );
      setDoctorAppointments(updatedAppointments);

      // Clear the selected appointment and new date fields
      setSelectedAppointment("");
      setNewAppointmentDate("");

      alert("Appointment Cancelled successfully!");
    } catch (error) {
      console.error("Error Cancelling appointment:", error);
      alert("Error Cancelling appointment. Please try again.");
    }
  };
  return (
    <div>
      <h2>Doctor Dashboard</h2>
      <h3>Doctor Username: {DoctorUsername}</h3>

      <div>
        <h3>Doctor Appointments</h3>

        <ul>
          {doctorAppointments &&
            doctorAppointments.map((appointment, index) => (
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
        <h3>Schedule Follow-Up</h3>

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
        <h3>Filter Doctor Appointments</h3>

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
        <h3>Reschedule Appointment</h3>

        <label>Select Appointment:</label>
        <select
          onChange={(e) => setSelectedAppointment(JSON.parse(e.target.value))}
          value={JSON.stringify(selectedAppointment)}
        >
          <option value="">Select Appointment</option>
          {appointmentsForReschedule.map((appointment, index) => (
            <option key={index} value={JSON.stringify(appointment)}>
              {`Date: ${appointment.date}, Status: ${appointment.status}`}
            </option>
          ))}
        </select>

        <label>New Date:</label>
        <input
          type="datetime-local"
          onChange={(e) => setNewAppointmentDate(e.target.value)}
          value={newAppointmentDate}
        />

        <button type="button" onClick={rescheduleAppointment}>
          Reschedule Appointment
        </button>
      </div>
      <div>
        <h3>Cancel Appointment</h3>

        <label>Select Appointment:</label>
        <select
          onChange={(e) => setSelectedAppointment(JSON.parse(e.target.value))}
          value={JSON.stringify(selectedAppointment)}
        >
          <option value="">Select Appointment</option>
          {appointmentsForReschedule.map((appointment, index) => (
            <option key={index} value={JSON.stringify(appointment)}>
              {`Date: ${appointment.date}, Status: ${appointment.status}`}
            </option>
          ))}
        </select>

        <button type="button" onClick={cancelAppointment}>
          Cancel Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorDash;
