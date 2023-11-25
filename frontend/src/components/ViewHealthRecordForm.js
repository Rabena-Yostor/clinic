import React, { useState } from 'react';

const ViewHealthRecordsForm = ({ onViewHealthRecords }) => {
  const [username, setUsername] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleViewHealthRecords = () => {
    onViewHealthRecords(username);
  };

  return (
    <div>
      <h2>View Health Records</h2>
      <label>
        Patient Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <button onClick={handleViewHealthRecords}>View Health Records</button>
    </div>
  );
};

export default ViewHealthRecordsForm;
