import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"; 

function PrescriptionList() {
  const [prescriptions, setPrescriptions] = useState([]);

  // Create a state to keep track of selected prescriptions
  const [selectedPrescriptions, setSelectedPrescriptions] = useState([]);

  useEffect(() => {
    // Fetch the prescriptions data when the component mounts
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/prescription/prescriptions');
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

  const handlePrescriptionClick = (prescriptionId) => {
    // Check if the prescription is already in the selectedPrescriptions array
    const isSelected = selectedPrescriptions.includes(prescriptionId);

    // Toggle the selection by adding or removing the prescription ID
    if (isSelected) {
      setSelectedPrescriptions(selectedPrescriptions.filter((id) => id !== prescriptionId));
    } else {
      setSelectedPrescriptions([...selectedPrescriptions, prescriptionId]);
    }
  };

  return (
    <div>
      <h1>Prescription List</h1>
      <ul>
      <Link to="/filter-prescriptions">
        <button>Prescription Filter</button>
      </Link>
        {prescriptions.map((prescription) => (
          <li
            key={prescription._id}
            className={selectedPrescriptions.includes(prescription._id) ? 'selected' : ''}
            onClick={() => handlePrescriptionClick(prescription._id)}
          >
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
