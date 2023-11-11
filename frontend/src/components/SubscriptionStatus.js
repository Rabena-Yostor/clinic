import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';

const SubscriptionStatus = () => {
  const [patientId, setPatientId] = useState('');
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setPatientId(e.target.value);
  };

  const fetchSubscriptionStatus = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/patient/getSubscriptionStatus?patientId=${patientId}`);
      const data = await response.json();

      if (response.ok) {
        setSubscriptions(data.subscriptions);
        setError(null);
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error('Error fetching subscription status:', error);
      setError('Internal Server Error');
    }
  };

  return (
    <div className="container">
      <h2>
        <FaUser /> Subscription Status
      </h2>
      <div className="form-group">
        <label htmlFor="patientId">Enter Patient ID:</label>
        <input type="text" id="patientId" value={patientId} onChange={handleInputChange} required />
        <button className="btn btn-primary" onClick={fetchSubscriptionStatus}>
          Fetch Subscription Status
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {subscriptions.length > 0 && (
        <div className="subscription-list">
          <h3>Subscriptions:</h3>
          {subscriptions.map((subscription) => (
            <div key={subscription._id} className="subscription-item">
              <strong>Subscription ID:</strong> {subscription._id}<br />
              <strong>Patient ID:</strong> {subscription.patient}<br />
              <strong>Status:</strong> {subscription.status}<br />
              <strong>Subscription Date:</strong> {subscription.subscriptionDate ? new Date(subscription.subscriptionDate).toLocaleString() : 'N/A'}<br />
              <strong>Expiration Date:</strong> {subscription.expirationDate ? new Date(subscription.expirationDate).toLocaleString() : 'N/A'}<br />
              <strong>Cancellation Date:</strong> {subscription.cancellationDate ? new Date(subscription.cancellationDate).toLocaleString() : 'N/A'}<br />
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubscriptionStatus;
