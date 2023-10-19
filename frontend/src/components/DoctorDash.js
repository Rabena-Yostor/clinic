import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DoctorDashboard = () => {
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctorUsername, setDoctorUsername] = useState(''); 

  const handleFilterAppointments = async () => {
    try {
      const response = await axios.get(`/api/doctors/filterAllApps/doctor?date=${date}&status=${status}`);
      setFilteredAppointments(response.data);
    } catch (error) {
      console.error('Error filtering appointments:', error);
    }
  };

  // const handleViewPatients = async (username) => {
  //   try {
  //     const response = await axios.get(`/api/doctors/getPatientForDoctors/${username}`);
  //     setPatients(response.data.patients);
  //   } catch (error) {
  //     console.error('Error fetching patients:', error);
  //   }
  // };

  const handleGetPatientsForDoctor = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/doctors/getPatientsForDoctors/${doctorUsername}`);
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
        {filteredAppointments.map(doctor => (
          <li key={doctor._id}>
            {`Doctor Name: ${doctor.name},Date: ${doctor.availableAppointment}, Status: ${doctor.Appointment_Status}`}

          </li>
        ))}
      </ul>


      <label>Doctor Username:</label>
        <input type="text" value={doctorUsername} onChange={(e) => setDoctorUsername(e.target.value)} />
        <button onClick={handleGetPatientsForDoctor}>Get Patients</button>

        <Link to="/filterAppointment">
        <button>Filter Appointments</button>
        </Link>
    </div>
  );
};

export default DoctorDashboard;
