import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';


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
    
  };

  const handleEditMedicine = (prescriptionId, medicine) => {
    // Open modal or navigate to a new component for editing medicine
    const selectedPrescription = prescriptions.find((prescription) => prescription._id === prescriptionId);
    setSelectedPrescription(selectedPrescription);
    setSelectedMedicine(medicine);
  };
  const handleDeleteMedicine = async (prescriptionId, medicineName) => {
    try {
      // Display a confirmation prompt
      const isConfirmed = window.confirm(`Are you sure you want to delete ${medicineName}?`);
  
      if (!isConfirmed) {
        return; // User canceled the delete operation
      }
  
      // Perform the delete operation on the backend
      await fetch(`http://localhost:4000/api/prescription/delete-medicine-from-prescription/${prescriptionId}/${medicineName}`, {
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

  const handleDownloadPDF = (prescription) => {
    const doc = new jsPDF();
  
    // Add prescription details to the PDF
    doc.text(`Prescription Details - Patient: ${prescription.patientUsername}`, 20, 10);
    doc.text(`Date: ${prescription.date}`, 20, 20);
    doc.text(`Filled: ${prescription.filled ? 'Yes' : 'No'}`, 20, 30);
  
    // Add medicines details
    prescription.medicines.forEach((medicine, index) => {
      const y = 40 + index * 10;
      doc.text(`${medicine.name} - Dosage: ${medicine.dosage} - Price: EGP${medicine.price} - Quantity: ${medicine.quantity}`, 20, y);
    });
  
  // Save the PDF using FileSaver
  const fileName = `Prescription_${prescription._id}.pdf`;
  doc.save(fileName);
  };
  

  return (
    <div>
      <h1>Prescriptions List For My Patients</h1>
      <ul>
      {prescriptions.map((prescription) => (
  <li key={prescription._id}>
    <ul>
      <p style = {{marginTop: '10px'}}>Patient Name: {prescription.patientUsername}</p>
      {prescription.medicines.map((medicine, index) => (
        <li key={medicine.name} style={{ marginBottom: '10px' }}>
          {medicine.name} - Dosage: {medicine.dosage} - Price: EGP{medicine.price} - Quantity: {medicine.quantity}
          <button
            onClick={() => handleEditMedicine(prescription._id, medicine)}
            style={{ width: '120px', marginRight: '5px', marginLeft: '5px' }}
          >
            Edit Medicine
          </button>
          <button
            onClick={() => handleDeleteMedicine(prescription._id, medicine.name)}
            style={{ width: '130px', marginRight: '5px', marginLeft: '5px' }}
          >
            Delete Medicine
          </button>
        </li>
      ))}
    </ul>
    <p style = {{marginTop: '10px'}}>Date: {prescription.date}</p>
    <p style = {{marginTop: '10px', marginBottom:'10px'}}>Filled: {prescription.filled ? 'Yes' : 'No'}</p>
    <button onClick={() => handleDownloadPDF(prescription)}>Download as PDF</button>
    <p>_________________________________</p>
  </li>
))}

      </ul>

     {/* Modal for editing medicine */}
     {selectedMedicine && (
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '80%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          zIndex: '1000',
        }}
      >
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
