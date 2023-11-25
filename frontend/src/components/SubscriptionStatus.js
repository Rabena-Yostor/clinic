import { FaUser } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SubscriptionStatus = () => {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      console.log('User not authenticated, redirecting to login');
      navigate('/login');
    } else {
      console.log('User authenticated, fetching subscription status');
      fetchSubscriptionStatus();
    }
  }, [navigate]);

  const fetchSubscriptionStatus = async () => {
    const username = localStorage.getItem('username');
    try {
      const response = await fetch(`http://localhost:4000/api/patient/getSubscriptionStatus/${username}`);
      const data = await response.json();

      if (response.ok) {
        setSubscriptions([data]); // Wrap data in an array to map over it in the render
        setError(null);
      } else {
        setError(data.error || 'Internal Server Error');
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
        <button className="btn btn-primary" onClick={fetchSubscriptionStatus}>
          Fetch Subscription Status
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {subscriptions.length > 0 && (
        <div className="subscription-list">
          <h3>Subscriptions:</h3>
          {subscriptions.map((subscription) => (
            <div key={subscription.subscriptionId} className="subscription-item">
              <strong>Subscription ID:</strong> {subscription.subscriptionId}<br />
              <strong>Status:</strong> {subscription.status}<br />
              <strong>Subscription Date:</strong> {subscription.subscriptionDate ? new Date(subscription.subscriptionDate).toLocaleString() : 'N/A'}<br />
             
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubscriptionStatus;
