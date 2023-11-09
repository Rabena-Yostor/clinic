// PatientDashboard.js
import React from 'react';
import WalletInfo from './WalletInfo';

const PatientDashboard = ({ username }) => {
  return (
    <div>
      <h1>Welcome, {username}!</h1>
      {/* Other components or information for the patient */}
      <WalletInfo username={username} />
    </div>
  );
};

export default PatientDashboard;
