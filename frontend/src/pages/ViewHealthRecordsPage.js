import React, { useState } from 'react';
import HealthRecordList from '../components/HealthRecordList';

const ViewHealthRecordsPage = () => {
  const [username, setUsername] = useState('');
  const [healthRecords, setHealthRecords] = useState([]);
  const [error, setError] = useState(null);

  const fetchHealthRecords = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/doctors/viewHealthRecords/${username}`);
      const data = await response.json();

      if (!response.ok) {
        setError('Error fetching health records. Please try again.');
      } else {
        // Update state to replace existing data with new data
        setHealthRecords(data);
        setError(null);
      }
    } catch (error) {
      console.error('Error fetching health records:', error);
      setError('Error fetching health records. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username) {
      fetchHealthRecords();
    } else {
      setError('Please enter a valid username.');
    }
  };

  return (
    <div>
      <h1>View Health Records</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Patient Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <button type="submit">Fetch Health Record</button>
      </form>

      {error && <div className="error">{error}</div>}

      <HealthRecordList healthRecords={healthRecords} />
    </div>
  );
};

export default ViewHealthRecordsPage;
