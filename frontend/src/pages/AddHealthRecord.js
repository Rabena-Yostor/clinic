import React, { useState } from 'react';

const AddHealthRecordForm = ({ onAddHealthRecord }) => {
  const [username, setUsername] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [allergies, setAllergies] = useState('');
  const [medications, setMedications] = useState('');

  const handleAddHealthRecord = async () => {
    try {
      // Call the API to add the health record
      const response = await fetch(`/api/doctors/addHealthRecord/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bloodPressure,
          heartRate,
          allergies,
          medications,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Health record added successfully:', data);
        // Handle success, e.g., show a success message or update state
        onAddHealthRecord();
      } else {
        const data = await response.json();
        if (response.status === 404 && data.error === 'Patient not found') {
          console.error('Error adding health record: Patient not found');
          // Handle patient not found error
        } else {
          console.error('Error adding/updating health record:', data.error);
          // Handle other errors, e.g., show an error message or update state
        }
      }
    } catch (error) {
      console.error('Error adding health record:', error.message);
      // Handle error, e.g., show an error message or update state
    }
  };

  return (
    <div className="add-health-record-form">
      <h2>Add Health Record</h2>
      <label>Patient Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

      <label>Blood Pressure:</label>
      <input type="text" value={bloodPressure} onChange={(e) => setBloodPressure(e.target.value)} />

      <label>Heart Rate:</label>
      <input type="text" value={heartRate} onChange={(e) => setHeartRate(e.target.value)} />

      <label>Allergies:</label>
      <input type="text" value={allergies} onChange={(e) => setAllergies(e.target.value)} />

      <label>Medications:</label>
      <input type="text" value={medications} onChange={(e) => setMedications(e.target.value)} />

      <button onClick={handleAddHealthRecord}>Add Health Record</button>
    </div>
  );
};

export default AddHealthRecordForm;
