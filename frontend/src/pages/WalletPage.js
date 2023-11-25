// WalletInfo.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ... (existing imports)

const WalletInfo = ({ username }) => {
    const navigate = useNavigate();
    const [walletbalance, setWallet] = useState(0);
  
    useEffect(() => {
      // Check if the user is authenticated
      const authToken = localStorage.getItem('authToken');
      console.log('Auth Token:', authToken); 
      if (!authToken) {
        console.log('User not authenticated, redirecting to login');
        navigate('/login');
      } else {
        console.log('User authenticated, fetching wallet information');
        fetchWalletInfo();
      }
    }, [navigate]);
  
    const fetchWalletInfo = async () => {
      try {
        const username = localStorage.getItem('username');
        const response = await fetch(`/api/patient/wallet-amount/${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log('Received wallet information:', data);
          
          // Use the callback form of setWallet to ensure correct state update
          setWallet(data.walletAmount);

          console.log('Wallet state after update:', walletbalance);
        } else {
          const errorData = await response.json();
          console.error('Error fetching wallet information:', errorData.error);
        }
      } catch (error) {
        console.error('Exception while fetching wallet information:', error);
      }
    };
  
    return (
      <div>
        <p>Your wallet balance:  {walletbalance}</p>
      </div>
    );
  };
  
  export default WalletInfo;
  