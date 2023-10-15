import React, { useState } from 'react';
import axios from 'axios';

const DoctorDashboard = () => {
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [patients, setPatients] = useState([]);

  const handleFilterAppointments = async () => {
    try {
      const response = await axios.get(`/appt/filter/doctor?date=${date}&status=${status}`);
      setFilteredAppointments(response.data);
    } catch (error) {
      console.error('Error filtering appointments:', error);
    }
  };

  const handleViewPatients = async (username) => {
    try {
      const response = await axios.get(`/appt/get/${username}`);
      setPatients(response.data.patients);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  return (
    <div>
      <h1>Doctor Dashboard</h1>

      <div>
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <div>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Select Status</option>
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="rescheduled">Rescheduled</option>
        </select>
      </div>

      <button onClick={handleFilterAppointments}>Filter Appointments</button>

      <h2>Filtered Appointments</h2>
      <ul>
        {filteredAppointments.map(appointment => (
          <li key={appointment._id}>
            {`Date: ${appointment.Appointment}, Status: ${appointment.Appointment_Status}`}
            <button onClick={() => handleViewPatients(appointment.UserName)}>View Patients</button>
          </li>
        ))}
      </ul>

      <h2>Patients for the Selected Doctor</h2>
      <ul>
        {patients.map(patient => (
          <li key={patient._id}>{`Patient Name: ${patient.name}, Email: ${patient.email}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorDashboard;
