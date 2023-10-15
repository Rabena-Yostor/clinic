import React, { useState, useEffect } from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
// import Navbar from './components/Navbar';
import axios from 'axios';
function App() {
    const [id1, setId1] = useState('');
  const [Email, setEmail] = useState('');
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
          const response = await axios.put('http://localhost:4000/updateDoctorEmail', { DoctorID: id1, Email:Email });
          console.log('Updated data for Group 1:', response.data);
        } catch (error) {
          console.error(error);
        }
        break;
      case 'group2':
        try {
          const response = await axios.put('http://localhost:4000/updateDoctorHourlyRate', { DoctorID: id2, HourlyRate: hourlyRate  });
          console.log('Updated data for Group 2:', response.data);
        } catch (error) {
          console.error('Error updating data for Group 2:', error);
        }
        break;
      case 'group3':
        try {
          const response = await axios.put('http://localhost:4000/updateDoctorAffiliation', { DoctorID: id3, Affiliation: affiliation });
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
      const response = await axios.get('http://localhost:4000/getDoctors');
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
          <label>ID:</label>
          <input
            type="text"
            value={id1}
            onChange={(e) => setId1(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button onClick={() => handleUpdate('group1')}>Update</button>
      </div>

      <div className="textbox-group">
        <div>
          <label>ID:</label>
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
          <label>ID:</label>
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
              ID: {doctor.DoctorID}, Name: {doctor.Name}, Email: {doctor.Email}, Hourly Rate: {doctor.HourlyRate}, Affiliation: {doctor.Affiliation}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
