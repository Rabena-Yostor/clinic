// WalletInfo.js
import React, { useState, useEffect } from 'react';

const WalletInfo = ({ username }) => {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    // Fetch wallet information when the component mounts
    fetchWalletInfo();
  }, []);

  const fetchWalletInfo = async () => {
    try {
      // Make a request to your server to fetch the wallet information
      const response = await fetch(`/api/patients/${username}`);
      const data = await response.json();

      // Assuming the wallet value is stored in the 'wallet' property
      setWallet(data.wallet);
    } catch (error) {
      console.error('Error fetching wallet information:', error);
    }
  };

  return (
    <div>
      {wallet !== null ? (
        <p>Your wallet balance: ${wallet}</p>
      ) : (
        <p>Loading wallet information...</p>
      )}
    </div>
  );
};

export default WalletInfo;
