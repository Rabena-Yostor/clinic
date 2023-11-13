// HealthRecordsPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HealthRecordsPage = () => {
  const navigate = useNavigate();
  const [healthRecords, setHealthRecords] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if the user is authenticated
    const authToken = localStorage.getItem('authToken');
    console.log('Auth Token:', authToken); 
    if (!authToken) {
      console.log('User not authenticated, redirecting to login');
      navigate('/login');
    } else {
      console.log('User authenticated, fetching health records');
      handleViewRecords();
    }
  }, [navigate]);

  const handleViewRecords = async () => {
    const username = localStorage.getItem('username');
    try {
      console.log('Fetching health records...');
      const response = await fetch(`http://localhost:4000/api/patient/viewHealthRecords/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
  
      if (response.ok) {
        console.log('Health records fetched successfully');
        const data = await response.json();
        setHealthRecords(data);
        setError(null);
      } else {
        const errorResponse = await response.json(); // Parse error response
        console.error('Error fetching health records:', errorResponse);
        setError('Error fetching health records');
      }
    } catch (error) {
      console.error('Exception while fetching health records:', error);
      console.error('Error fetching health records:', error);
      setError('Error fetching health records');
    }
  };
  
  console.log('Rendering HealthRecordsPage component');

  return (
    <div>
      <h2>Health Records</h2>
      <button onClick={handleViewRecords}>View My Records</button>
      {error && <div className="error">{error}</div>}
      {healthRecords.length > 0 ? (
        <div>
          <h3>Health Records</h3>
          {healthRecords.map((record) => (
            <div key={record._id}>
              <p>Blood Pressure: {record.bloodPressure}</p>
              <p>Heart Rate: {record.heartRate}</p>
              <p>Allergies: {record.allergies}</p>
              <p>Medications: {record.medications}</p>
              {/* Add more fields as needed */}
            </div>
          ))}
        </div>
      ) : (
        <p>No health records found.</p>
      )}
    </div>
  );
};

export default HealthRecordsPage;
