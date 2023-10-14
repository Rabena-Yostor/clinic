import React from 'react';

const PrescriptionList = ({ prescriptions }) => {
  return (
    <div>
      <h2>Your Prescriptions</h2>
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
};

export default PrescriptionList;
