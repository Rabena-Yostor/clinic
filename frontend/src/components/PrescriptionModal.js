import React, { useState } from 'react';

const PrescriptionModal = ({ prescription, onClose, onUpdateMedicine, onDeleteMedicine }) => {
  const [updatedMedicine, setUpdatedMedicine] = useState({ name: '', dosage: '' });

  const handleUpdateMedicine = () => {
    // Perform any validation if needed
    onUpdateMedicine(updatedMedicine);
    onClose();
  };

  const handleDeleteMedicine = (medicine) => {
    // Optionally, confirm deletion with the user
    if (window.confirm(`Are you sure you want to delete ${medicine.name}?`)) {
      onDeleteMedicine(medicine);
      onClose();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Prescription</h2>

        {/* Display prescription details */}
        <p>Patient Name: {prescription.patientUsername}</p>
        <p>Date: {prescription.date}</p>
        <p>Filled: {prescription.filled ? 'Yes' : 'No'}</p>

        {/* Display medicines and provide input fields for updating */}
        <ul>
          {prescription.medicines.map((medicine, index) => (
            <li key={index}>
              <span>{medicine.name} - Dosage: {medicine.dosage}</span>
              <input
                type="text"
                placeholder="New Dosage"
                value={updatedMedicine.dosage}
                onChange={(e) => setUpdatedMedicine({ ...updatedMedicine, dosage: e.target.value })}
              />
              <button onClick={() => handleUpdateMedicine(medicine)}>Update</button>
              <button onClick={() => handleDeleteMedicine(medicine)}>Delete</button>
            </li>
          ))}
        </ul>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PrescriptionModal;
