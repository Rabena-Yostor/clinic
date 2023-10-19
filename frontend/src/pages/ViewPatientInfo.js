import React, { useState } from 'react';

const ViewPatientInfo = () => {
  const [patientId, setPatientId] = useState('');
  const [patientInfo, setPatientInfo] = useState(null);
  const [error, setError] = useState('');

  const handleViewPatientInfo = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/patients/patientinfo?patientId=${patientId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPatientInfo(data);
        setError('');
      } else {
        const data = await response.json();
        setError(data.error);
        setPatientInfo(null);
      }
    } catch (error) {
      console.error('Internal Server Error:', error);
      setError('Error occurred while fetching patient information');
      setPatientInfo(null);
    }
  };

  return (
    <div className="ViewPatientInfo">
      <h2>View Patient Information</h2>
      <input
        type="text"
        placeholder="Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
      />
      <button onClick={handleViewPatientInfo}>View Information</button>
      {error && <p>Error: {error}</p>}
      {patientInfo && (
        <div>
          <h3>Patient Information</h3>
          <p>Username: {patientInfo.username}</p>
          <p>Name: {patientInfo.name}</p>
          <p>Email: {patientInfo.email}</p>
          <p>Date of Birth: {patientInfo.dateofbirth}</p>
          <p>Gender: {patientInfo.gender}</p>
          <p>Mobile Number: {patientInfo.mobilenumber}</p>
          <p>Emergency Contact: {patientInfo.emergencyfullname}</p>
          <p>Emergency Contact Number: {patientInfo.emergencynumber}</p>
          {/* Include other information fields as needed */}
        </div>
      )}
    </div>
  );
};

export default ViewPatientInfo;
