// PrescriptionList.js
import React, { useState, useEffect } from 'react';

function PrescriptionList() {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    // Fetch the prescriptions data when the component mounts
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/routers/prescriptions');
      if (response.ok) {
        const data = await response.json();
        setPrescriptions(data);
      } else {
        console.error('Failed to fetch prescriptions.');
      }
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    }
  };

  return (
    <div>
      <h1>Prescription List</h1>
      <ul>
        {prescriptions.map((prescription) => (
          <li key={prescription._id}>
            <p>Name: {prescription.name}</p>
            <p>Price: {prescription.price}</p>
            <p>Grams: {prescription.grams}</p>
            <p>Date: {prescription.date}</p>
            <p>Doctor: {prescription.doctor}</p>
            <p>Filled: {prescription.filled ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PrescriptionList;
