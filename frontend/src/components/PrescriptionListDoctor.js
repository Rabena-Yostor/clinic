import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PrescriptionList() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  useEffect(() => {
    // Fetch the prescriptions data when the component mounts
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const username = localStorage.getItem('username');
      const response = await fetch(`http://localhost:4000/api/prescription/get-prescriptions-doctor/${username}`);
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

  const handleEditClick = (prescriptionId) => {
    const selectedPrescription = prescriptions.find((prescription) => prescription._id === prescriptionId);
    setSelectedPrescription(selectedPrescription);
  };

  const handleEditMedicine = (medicine) => {
    // Open modal or navigate to a new component for editing medicine
    setSelectedMedicine(medicine);
  };

  const handleDeleteMedicine = async (medicineName) => {
    try {
        console.log(medicineName);
        console.log(selectedPrescription._id);
      // Perform the delete operation on the backend
      await fetch(`http://localhost:4000/api/prescription/delete-medicine-from-prescription/${selectedPrescription._id}/${medicineName}`, {
        method: 'PUT',
      });

      // After deleting on the backend, fetch updated prescriptions
      fetchPrescriptions();
    } catch (error) {
      console.error('Error deleting medicine:', error);
    }
  };

  const handleUpdateMedicine = async (updatedMedicine) => {
    try {
      // Perform the update operation on the backend
      await fetch(`http://localhost:4000/api/prescription/update-medicine-dosage/${selectedPrescription._id}/${updatedMedicine.name}/${updatedMedicine.dosage}`, {
        method: 'PUT',
      });

      // After updating on the backend, fetch updated prescriptions
      fetchPrescriptions();
    } catch (error) {
      console.error('Error updating medicine dosage:', error);
    }
  };

  const handleCloseModal = () => {
    setSelectedPrescription(null);
    setSelectedMedicine(null);
  };

  return (
    <div>
      <h1>Prescriptions List For My Patients</h1>
      <ul>
        {prescriptions.map((prescription) => (
          <li key={prescription._id}>
            <ul>
              <p>Patient Name: {prescription.patientUsername}</p>
              {prescription.medicines.map((medicine) => (
                <li key={medicine.name}>
                  {medicine.name} - Dosage: {medicine.dosage} - Price: EGP{medicine.price} - Quantity: {medicine.quantity}
                  <button onClick={() => handleEditMedicine(medicine)}>Edit Medicine</button>
                  <button onClick={() => handleDeleteMedicine(medicine.name)}>Delete Medicine</button>
                </li>
              ))}
            </ul>
            <p>Date: {prescription.date}</p>
            <p>Filled: {prescription.filled ? 'Yes' : 'No'}</p>
            <button onClick={() => handleEditClick(prescription._id)}>Edit Prescription</button>
            <p>_________________________________</p>
          </li>
        ))}
      </ul>

      {/* Modal for editing medicine */}
      {selectedMedicine && (
        <div>
          <h2>Edit Medicine</h2>
          <p>{selectedMedicine.name} - Dosage: {selectedMedicine.dosage}</p>
          <input
            type="text"
            value={selectedMedicine.dosage}
            onChange={(e) => setSelectedMedicine({ ...selectedMedicine, dosage: e.target.value })}
          />
          <button onClick={() => handleUpdateMedicine(selectedMedicine)}>Update Dosage</button>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}
    </div>
  );
}

export default PrescriptionList;
