import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';


const CancelSubscription = () => {
  const [patientId, setPatientId] = useState('');
  const [subscriptionId, setSubscriptionId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePatientIdChange = (e) => {
    setPatientId(e.target.value);
  };

  const handleSubscriptionIdChange = (e) => {
    setSubscriptionId(e.target.value);
  };

  const cancelSubscription = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/patient/cancelSubscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ patientId, subscriptionId }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        setErrorMessage('');
      } else {
        setErrorMessage(data.error);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error canceling subscription:', error);
      setErrorMessage('Internal Server Error');
      setSuccessMessage('');
    }
  };

  return (
    <div className="container">
    <h2>
      <FaUser /> Cancel Subscription
    </h2>
    <div className="form-group">
      <label htmlFor="patientId">Enter Patient ID:</label>
      <input type="text" id="patientId" value={patientId} onChange={handlePatientIdChange} required />
    </div>
    <div className="form-group">
      <label htmlFor="subscriptionId">Enter Subscription ID:</label>
      <input type="text" id="subscriptionId" value={subscriptionId} onChange={handleSubscriptionIdChange} required />
    </div>
    <button className="cancel-button" onClick={cancelSubscription}>
      Cancel Subscription
    </button>
    {errorMessage && <p className="error-message">{errorMessage}</p>}
    {successMessage && <p className="success-message">{successMessage}</p>}
  </div>
);
};


export default CancelSubscription;
