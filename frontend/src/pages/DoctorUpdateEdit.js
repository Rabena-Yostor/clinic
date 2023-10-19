import React, { useState, useEffect } from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
// import Navbar from './components/Navbar';
import axios from 'axios';
function DoctorUpdateEdit() {
    const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [id2, setId2] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [id3, setId3] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
  }, []);

  const handleUpdate = async (group) => {
    switch (group) {
      case 'group1':
        try {
          const response = await axios.put('http://localhost:4000/api/doctors/updateDoctorEmail', { username: username, email:email });
          console.log('Updated data for Group 1:', response.data);
        } catch (error) {
          console.error(error);
        }
        break;
      case 'group2':
        try {
          const response = await axios.put('http://localhost:4000/api/doctors/updateDoctorHourlyRate', { username: id2, hourlyRate: hourlyRate  });
          console.log('Updated data for Group 2:', response.data);
        } catch (error) {
          console.error('Error updating data for Group 2:', error);
        }
        break;
      case 'group3':
        try {
          const response = await axios.put('http://localhost:4000/api/doctors/updateDoctorAffiliation', { username: id3, affiliation: affiliation });
          setAffiliation(affiliation)
          console.log('Updated data for Group 3:', response.data);
        } catch (error) {
          console.error('Error updating data for Group 3:', error);
        }
        break;
      default:
        break;
    }
    getDoctors();
  };
  const getDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/doctors/getAllDoctors');
      setDoctors(response.data);
      console.log('Fetched doctors:', response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  return (
    <div>
      <div className="textbox-group">
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button onClick={() => handleUpdate('group1')}>Update</button>
      </div>

      <div className="textbox-group">
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={id2}
            onChange={(e) => setId2(e.target.value)}
          />
        </div>
        <div>
          <label>Hourly Rate:</label>
          <input
            type="text"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
          />
        </div>
        <button onClick={() => handleUpdate('group2')}>Update</button>
      </div>

      <div className="textbox-group">
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={id3}
            onChange={(e) => setId3(e.target.value)}
          />
        </div>
        <div>
          <label>Affiliation:</label>
          <input
            type="text"
            value={affiliation}
            onChange={(e) => setAffiliation(e.target.value)}
          />
        </div>
        <button onClick={() => handleUpdate('group3')}>Update</button>
      </div>
      <button onClick={getDoctors}>Get Doctors</button>

      <div>
        <h2>Doctors</h2>
        <ul>
          {doctors.map((doctor) => (
            <li key={doctor.id}>
              Username: {doctor.username}, Name: {doctor.name}, Email: {doctor.email}, Hourly Rate: {doctor.hourlyRate}, Affiliation: {doctor.affiliation}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DoctorUpdateEdit;
