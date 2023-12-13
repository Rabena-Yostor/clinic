import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AppointmentFollowUp = () => {

    const navigate = useNavigate();
    const redirect = () => {
        // Redirect to the AppointmentFollowUp page
        navigate('/patientPeter');
      };
    const patientUsername = localStorage.getItem('username');
    const [newPatientAppointmentDate, setNewPatientAppointmentDate] =
    useState("");

    const addPatientAppointment = async () => {
        try {
            const patientUsername = localStorage.getItem('username');
            const response = await axios.post(
            `/api/patient/followUpRequest/${patientUsername}`,
            {
              username: patientUsername,
              date: newPatientAppointmentDate,
            }
          );
          redirect();
        } catch (error) {
          console.error("Error adding patient appointment:", error);
        }
      };

return (
    <div>
      <h2>Patient Dashboard</h2>
      <h3>Patient Username: {patientUsername}</h3>
       
      <div>
      <label>Date:</label>
        <input
          type="datetime-local"
          onChange={(e) => setNewPatientAppointmentDate(e.target.value)}
          value={newPatientAppointmentDate}
        />
        <button type="button" onClick={addPatientAppointment}>
          Add Patient Appointment
        </button>
      </div>
    </div>
  );
};

export default AppointmentFollowUp;