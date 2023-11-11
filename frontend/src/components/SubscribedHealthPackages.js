import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';

const SubscribedHealthPackages = () => {
  const [patientId, setPatientId] = useState('');
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setPatientId(e.target.value);
  };

  const fetchSubscribedHealthPackages = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/patient/getSubscribedHealthPackages?patientId=${patientId}`);
      const data = await response.json();

      if (response.ok) {
        setSubscriptions(data.subscriptions);
        setError(null);
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error('Error fetching subscribed health packages:', error);
      setError('Internal Server Error');
    }
  };

  return (
    <div className="container">
      <h2>
        <FaUser /> Subscribed Health Packages
      </h2>
      <div className="form-group">
        <label htmlFor="patientId">Enter Patient ID:</label>
        <input type="text" id="patientId" value={patientId} onChange={handleInputChange} required />
        <button className="btn btn-primary" onClick={fetchSubscribedHealthPackages}>
          Fetch Subscriptions
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {subscriptions.length > 0 ? (
        <div className="subscription-list">
          <h3>Subscriptions:</h3>
          <ul>
            {subscriptions.map((subscription) => (
              <li key={subscription._id}>
                <strong>Subscription ID:</strong> {subscription._id}<br />
                <strong>Health Package Type:</strong> {subscription.healthPackage.type}<br />
                <strong>Price:</strong> {subscription.healthPackage.price}<br />
                <strong>Subscription Date:</strong> {new Date(subscription.subscriptionDate).toLocaleString()}<br />
                <strong>Status:</strong> {subscription.status}<br />
                <hr />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No subscriptions found.</p>
      )}
    </div>
  );
};

export default SubscribedHealthPackages;
