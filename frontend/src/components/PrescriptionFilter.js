import React, { useState } from 'react';

const PrescriptionFilter = () => {
  const [date, setDate] = useState('');
  const [doctor, setDoctor] = useState('');
  const [filled, setFilled] = useState('');

  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);

  const username = localStorage.getItem('username'); // You can get the username from your context or a user session
  const handleFilterPrescriptions = async () => {
    try {
      const queryParams = [];
      if (date) {
        queryParams.push(`date=${date}`);
      }
      if (doctor) {
        queryParams.push(`doctor=${doctor}`);
      }
      if (filled !== '') {
        queryParams.push(`filled=${filled}`);
      }

      const queryString = queryParams.join('&');
      const response = await fetch(`http://localhost:4000/api/prescription/filterr/${username}?${queryString}`);
      if (response.ok) {
        const data = await response.json();
        setFilteredPrescriptions(data);
      } else {
        console.error('Failed to filter prescriptions');
      }
    } catch (error) {
      console.error('Error filtering prescriptions:', error);
    }
  };

  return (
    <div>
      <h1>Filter Prescriptions</h1>
      <div>
        <label>Date:</label>
        <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div>
        <label>Doctor:</label>
        <input type="text" value={doctor} onChange={(e) => setDoctor(e.target.value)} />
      </div>
      <div>
        <label>Filled/Unfilled:</label>
        <select value={filled} onChange={(e) => setFilled(e.target.value)}>
          <option value="">All</option>
          <option value="true">Filled</option>
          <option value="false">Unfilled</option>
        </select>
      </div>
      <button onClick={handleFilterPrescriptions}>Filter</button>

      <h2>Filtered Prescriptions:</h2>
      <ul>
        {filteredPrescriptions.map((prescription) => (
          <li key={prescription._id}>
            {prescription.name} - {prescription.date} - {prescription.doctor} - {prescription.filled ? 'Filled' : 'Unfilled'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrescriptionFilter;
