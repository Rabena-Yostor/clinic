import React from 'react';

const HealthRecordList = ({ healthRecords }) => {
  return (
    <div>
      <h2>Health Records</h2>
      {Array.isArray(healthRecords) && healthRecords.length > 0 ? (
        healthRecords.map((record) => (
          <div key={record._id}>
            <p>Blood Pressure: {record.bloodPressure}</p>
            <p>Heart Rate: {record.heartRate}</p>
            <p>Allergies: {record.allergies}</p>
            <p>Medications: {record.medications}</p>
            {/* Add more fields as needed */}
          </div>
        ))
      ) : (
        <p>No health records found for the specified patient.</p>
      )}
    </div>
  );
};

export default HealthRecordList;
