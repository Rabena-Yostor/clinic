import React, { useState } from 'react';

const AppointmentFilter = () => {
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');

  const [filteredAppointments, setFilteredAppointments] = useState([]);

  const handleFilterAppointments = async () => {
    try {
      const queryParams = [];
      if (date) {
        queryParams.push(`date=${date}`);
      }
      if (status) {
        queryParams.push(`status=${status}`);
      }

      const queryString = queryParams.join('&');
      const response = await fetch(`http://localhost:4000/api/doctors/filterAllApps/doctor/?${queryString}`);
      if (response.ok) {
        const data = await response.json();
        setFilteredAppointments(data);
      } else {
        console.error('Failed to filter appointments');
      }
    } catch (error) {
      console.error('Error filtering appointments:', error);
    }
  };

  return (
    <div>
      <h1>Filter Appointments</h1>
      <div>
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="rescheduled">Rescheduled</option>
        </select>
      </div>
      <button onClick={handleFilterAppointments}>Filter</button>

      <h2>Filtered Appointments:</h2>
      <ul>
        {filteredAppointments.map((appointment) => (
          <li key={appointment._id}>
            {`Date: ${appointment.availableAppointment}, Status: ${appointment.Appointment_Status}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentFilter;
