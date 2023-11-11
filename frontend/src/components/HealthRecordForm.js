import React, { useState } from 'react';

const HealthRecordForm = ({ onAddHealthRecord }) => {
  const [username, setUsername] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [allergies, setAllergies] = useState('');
  const [medications, setMedications] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleBloodPressureChange = (event) => {
    setBloodPressure(event.target.value);
  };

  const handleHeartRateChange = (event) => {
    setHeartRate(event.target.value);
  };

  const handleAllergiesChange = (event) => {
    setAllergies(event.target.value);
  };

  const handleMedicationsChange = (event) => {
    setMedications(event.target.value);
  };
  

  const handleAddHealthRecord = () => {
    // Call the parent component's function to add health record
    onAddHealthRecord(username, {
      bloodPressure,
      heartRate,
      allergies,
      medications,
    });
  };

  return (
    <div className="health-record-form">
      <h2>Add Health Record</h2>
      <label>Enter Patient Username:</label>
      <input type="text" value={username} onChange={handleUsernameChange} />

      <label>Blood Pressure:</label>
      <input type="text" value={bloodPressure} onChange={handleBloodPressureChange} />

      <label>Heart Rate:</label>
      <input type="text" value={heartRate} onChange={handleHeartRateChange} />

      <label>Allergies:</label>
      <input type="text" value={allergies} onChange={handleAllergiesChange} />

      <label>Medications:</label>
      <input type="text" value={medications} onChange={handleMedicationsChange} />

      <button onClick={handleAddHealthRecord}>Add Health Record</button>
    </div>
  );
};

export default HealthRecordForm;
