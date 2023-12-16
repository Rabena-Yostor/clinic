import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PrescriptionList() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescriptions, setSelectedPrescriptions] = useState([]);

  useEffect(() => {
    // Fetch the prescriptions data when the component mounts
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const username = localStorage.getItem('username');
      const response = await fetch(`http://localhost:4000/api/prescription/prescriptions/${username}`);
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
    const isSelected = selectedPrescriptions.includes(prescriptionId);

    if (isSelected) {
      setSelectedPrescriptions(selectedPrescriptions.filter((id) => id !== prescriptionId));
    } else {
      setSelectedPrescriptions([...selectedPrescriptions, prescriptionId]);
    }
  };

  return (
    <div>
      <h1>Prescriptions List</h1>
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
            
            <ul>
              {prescription.medicines.map((medicine) => (
                <li key={medicine.name}>
                  {medicine.name} - Dosage: {medicine.dosage} - Price: EGP{medicine.price} - Quantity: {medicine.quantity}
                </li>
              ))}
            </ul>
            

            <p>Date: {prescription.date}</p>
            <p>Doctor: {prescription.doctor}</p>
            <p>Filled: {prescription.filled ? 'Yes' : 'No'}</p>
            <p>_________________________________</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PrescriptionList;
