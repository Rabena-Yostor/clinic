import React, { useState } from 'react';

const PatientForm = ({ onUsernameSubmit }) => {
  const [username, setUsername] = useState('');

  const handleUsernameSubmit = () => {
    onUsernameSubmit(username);
  };

  return (
    <div>
      <h1>Welcome, Patient!</h1>
      <p>Please enter your username to view your prescriptions.</p>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleUsernameSubmit}>View Prescriptions</button>
    </div>
  );
};

export default PatientForm;
