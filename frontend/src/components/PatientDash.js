import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const PatientDash = () => {
  const navigate = useNavigate();
  const redirect = (doctorUsername) => {
    localStorage.setItem('doctorUsername', doctorUsername);
    // Redirect to the AppointmentFollowUp page
    navigate('/AppointmentFollowUp');
  };
  // State variables for rescheduling appointments
  const [appointmentsForReschedule, setAppointmentsForReschedule] = useState(
    []
  );
  const [selectedAppointment, setSelectedAppointment] = useState("");
  const [newAppointmentDate, setNewAppointmentDate] = useState("");

  // State variables for doctor appointments

  const patientUsername = localStorage.getItem("username");
  // State variables for patient appointment
  const [patientAppointments, setPatientAppointments] = useState([]);
  const [newPatientAppointmentDate, setNewPatientAppointmentDate] =
    useState("");
  const [newPatientAppointmentStatus, setNewPatientAppointmentStatus] =
    useState("");

  // New state variables for viewing patient appointments
  const [viewPatientAppointments, setViewPatientAppointments] = useState([]);

  // State variables for filtering patient appointments
  const [filterPatientDate, setFilterPatientDate] = useState("");
  const [filterPatientStatus, setFilterPatientStatus] = useState("");
  const [filteredPatientAppointments, setFilteredPatientAppointments] =
    useState([]);

  // Function to filter patient appointments
  const filterPatientAppointments = async () => {
    const viewPatientUsername = localStorage.getItem("username");
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
    getPatientAppointments();
  }, []);

  const getPatientAppointments = async () => {
    const patientUsername = localStorage.getItem("username");
    try {
      const response = await axios.get(
        `/api/patient/getPatientAppointments/${patientUsername}`
      );
      setPatientAppointments(response.data.appointments);
    } catch (error) {
      console.error("Error fetching patient appointments:", error);
    }
  };

  const addPatientAppointment = async () => {
    try {
      const patientUsername = localStorage.getItem("username");
      const response = await axios.post(
        "/api/patient/updatePatientAppointments",
        {
          username: patientUsername,
          appointments: 
          
            {
              date: newPatientAppointmentDate,
              status: newPatientAppointmentStatus,
            },
          
        }
      );
      setPatientAppointments(response.data.appointments);
      setNewPatientAppointmentDate("");
      setNewPatientAppointmentStatus("");
    } catch (error) {
      console.error("Error adding patient appointment:", error);
    }
  };
  const viewPatientAppointmentsHandler = async () => {
    const viewPatientUsername = localStorage.getItem("username");
    try {
      const response = await axios.get(
        `/api/patient/getPatientAppointments/${viewPatientUsername}`
      );
      setViewPatientAppointments(response.data.appointments);
    } catch (error) {
      console.error("Error fetching patient appointments:", error);
    }
  };
  // Fetch appointments for rescheduling when the component mounts
  useEffect(() => {
    getAppointmentsForReschedule();
  }, []);

  // Function to fetch appointments for rescheduling
  const getAppointmentsForReschedule = async () => {
    const patientUsername = localStorage.getItem("username");

    try {
      const response = await axios.get(
        `/api/patient/getPatientAppointments/${patientUsername}`
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
      const response = await axios.patch(`/api/patient/rescheduleAppointment`, {
        newDate: newAppointmentDate,
        appointmentId: selectedAppointment._id,
      });

      // Update the local state with the updated appointment
      const updatedAppointments = patientAppointments.map((appointment) =>
        appointment._id === selectedAppointment._id
          ? response.data
          : appointment
      );
      setPatientAppointments(updatedAppointments);

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
    const patientUsername = localStorage.getItem("username");

    try {
      const response = await axios.get(
        `/api/patient/getPatientAppointments/${patientUsername}`
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
      const response = await axios.patch(`/api/patient/cancelAppointment`, {
        appointmentId: selectedAppointment._id,
      });

      // Update the local state with the updated appointment
      const updatedAppointments = patientAppointments.map((appointment) =>
        appointment._id === selectedAppointment._id
          ? response.data
          : appointment
      );
      setPatientAppointments(updatedAppointments);

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
      <h2>Patient Dashboard</h2>
      <h3>Patient Username: {patientUsername}</h3>

      <div></div>
      <div>
        <h3>Patient Appointments</h3>
        <ul>
          {patientAppointments.map((appointment, index) => (
            <li key={index}>
              Date: {appointment.date}, Status: {appointment.status}, Doctor: {appointment.doctorUsername} {appointment.status === "completed" ? (
                            <>
                                <button type="button" onClick={() => redirect(appointment.doctorUsername)}>
                                Schedule a follow-up
                                </button>
                            </>
                        ) : (
                            <></>
                        )}
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
        <h3>View Patient Appointments</h3>

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
        <h3>Filter Patient Appointments</h3>

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

export default PatientDash;
