

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState({});
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    // Fetch doctor information
    axios.get('/appt/doctor/your-doctor-username')
      .then(response => {
        setDoctor(response.data);
      })
      .catch(error => {
        console.error('Error fetching doctor data:', error);
      });

    // Fetch filtered appointments
    axios.get(`/appt/filter/${dateFilter}/${statusFilter}`)
      .then(response => {
        setFilteredAppointments(response.data);
      })
      .catch(error => {
        console.error('Error fetching filtered appointments:', error);
      });
  }, [dateFilter, statusFilter]);

  return (
    <div>
      <h1>Welcome, Dr. {doctor.Name}</h1>
      <div>
        <h2>Your Patients:</h2>
        <ul>
          {doctor.ArrayOfPatients.map(patient => (
            <li key={patient._id}>{patient.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Filtered Appointments:</h2>
        <label>Date Filter:</label>
        <input type="text" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
        <label>Status Filter:</label>
        <input type="text" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} />
        <ul>
          {filteredAppointments.map(appointment => (
            <li key={appointment._id}>{appointment.appdate} - {appointment.appstatus}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorDashboard;
