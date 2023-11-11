import React from 'react';

const HealthRecordsList = ({ healthRecords }) => {
  return (
    <div>
      {healthRecords.length > 0 ? (
        <div>
          <h3>Health Records:</h3>
          <ul>
            {healthRecords.map((record) => (
              <li key={record._id}>
                <p>Blood Pressure: {record.bloodPressure}</p>
                <p>Heart Rate: {record.heartRate}</p>
                <p>Allergies: {record.allergies}</p>
                <p>Medications: {record.medications}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No health records found.</p>
      )}
    </div>
  );
};

export default HealthRecordsList;
