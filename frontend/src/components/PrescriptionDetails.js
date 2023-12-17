// PrescriptionDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';



const PrescriptionDetails = ({ prescriptionId }) => {
  const { id } = useParams();
  const [prescriptionDetails, setPrescriptionDetails] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch prescription details based on prescriptionId
    const fetchPrescriptionDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/prescription/view-prescription/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPrescriptionDetails(data);
          calculateTotalPrice(data.medicines);

        } else {
          console.error('Failed to fetch prescription details.');
        }
      } catch (error) {
        console.error('Error fetching prescription details:', error);
      }
    };

    fetchPrescriptionDetails();
    fetchWalletBalance();
  }, [prescriptionId]);

  const fetchWalletBalance = async () => {
    try {
      // Replace 'username' with the actual username or get it dynamically
      const username = localStorage.getItem('username');
      const response = await fetch(`http://localhost:4000/api/patient/getWallet/${username}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Entire Response:', data);  // Log the entire response
      setWalletBalance(data.wallet);

    } catch (error) {
      console.error('Error fetching wallet balance:', error);
    }
  };


  const calculateTotalPrice = (medicines) => {
    const totalPrice = medicines.reduce((total, medicine) => {
      return total + medicine.price;
    }, 0);

    setTotalPrice(totalPrice);
  };

  const handlePayWithWallet = async () => {
    try {
      const username = localStorage.getItem('username');
      const response = await fetch(`http://localhost:4000/api/patient/pay-with-wallet/${id}/${username}`, {
        method: 'PUT',
      });

      if (response.ok) {
        // Payment successful, update local state
        setWalletBalance(walletBalance - totalPrice);
        setPrescriptionDetails({ ...prescriptionDetails, filled: true });
        setShowSuccessModal(true); // Show success modal
      } else {
        setShowFailModal(true); // Show fail modal

        console.error('Failed to pay with wallet.');
      }
    } catch (error) {
      
      console.error('Error processing payment:', error);
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };

  const handlePayWithCard = async () => {
    try{
        window.location.href = `/payment/${id}`;
    }
    catch(error){
        console.error('Error paying with card:', error);
        setErrorMessage('Something went wrong. Please try again.'); // Display a generic error message
        setSuccessMessage(''); // Clear any existing success message
    }
}

const handleDownloadPDF = () => {
  const doc = new jsPDF();
  
  // Add prescription details to the PDF
  doc.text(`Prescription Details - ID: ${id}`, 20, 10);
  doc.text(`Date: ${prescriptionDetails.date}`, 20, 20);
  doc.text(`Doctor: ${prescriptionDetails.doctor}`, 20, 30);

  // Add medicines details
  prescriptionDetails.medicines.forEach((medicine, index) => {
    const y = 40 + index * 10;
    doc.text(`${medicine.name} - Quantity: ${medicine.quantity} - Dosage: ${medicine.dosage} - Price: ${medicine.price}`, 20, y);
  });

   // Save the PDF using FileSaver
  const fileName = `Prescription_${id}.pdf`;
  doc.save(fileName);
};
return (
  <div style={{ margin: '20px' }}>
    <h2 style={{ marginBottom: '20px' }}>Prescription Details</h2>
    <p style={{ marginBottom: '10px', position: 'absolute', top: 200, right: 50, color: 'black' }}>
      Wallet Balance: {walletBalance} EGP
    </p>

    {prescriptionDetails ? (
      <div>
        <ul>
          {prescriptionDetails.medicines.map((medicine) => (
            <li key={medicine.name}>
              {medicine.name} - Quantity: {medicine.quantity} - Dosage: {medicine.dosage} - Price: {medicine.price}
            </li>
          ))}
        </ul>

        <p style={{ marginTop: '70px' }}>Date: {prescriptionDetails.date}</p>
        <p style={{ marginTop: '70px' }}>Doctor: {prescriptionDetails.doctor}</p>
        <p style={{ marginTop: '70px' }}>Filled: {prescriptionDetails.filled ? 'Yes' : 'No'}</p>
        <p style={{ marginTop: '70px' }}>Your Username: {prescriptionDetails.patientUsername}</p>
        <p style={{ marginTop: '70px' }}>Total Price: {totalPrice} EGP</p>

        {!prescriptionDetails.filled && (
          <button onClick={handlePayWithWallet} style={{ marginTop: '20px' }}>
            Pay with Wallet
          </button>
        )}
        {!prescriptionDetails.filled && (
          <button onClick={handlePayWithCard} style={{ marginLeft: '20px', marginTop: '20px' }}>
            Pay with Card
          </button>
        )}
        <button onClick={handleDownloadPDF} style={{ marginLeft: '20px', marginTop: '20px' }}>
          Download as PDF
        </button>
      </div>
    ) : (
      <p>Loading prescription details...</p>
    )}

    {/* Modals and their styles remain the same */}
  </div>
);
};

export default PrescriptionDetails;
const modalStyle = {
  display: 'block',
  position: 'fixed',
  zIndex: 1,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  overflow: 'auto',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
};

const modalContentStyle = {
  backgroundColor: '#fefefe',
  margin: '15% auto',
  padding: '20px',
  border: '1px solid #888',
  width: '60%',
};

const closeStyle = {
  color: '#aaa',
  float: 'right',
  fontSize: '28px',
  fontWeight: 'bold',
  cursor: 'pointer',
};