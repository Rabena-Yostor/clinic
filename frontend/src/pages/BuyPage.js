import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BuyPage = () => {
  // Step 1: Set up a state variable for wallet balance
  const [walletBalance, setWalletBalance] = useState(1000); // Initialize with $1000
  const [errorMessage, setErrorMessage] = useState(''); // Initialize error message as empty

  // Step 2: Display the wallet balance and handle "Buy with Wallet" click
  const handleBuyWithWallet = () => {
    // Step 3: Add an if condition to check the wallet balance
    if (walletBalance >= 400) {
      // Deduct $400
      setWalletBalance(walletBalance - 400);
      console.log('Buying with Wallet...');
    } else {
      // Set an error message to display to the user
      setErrorMessage('Insufficient balance in the wallet. Cannot make the purchase.');
    }
  };

  return (
    <div>
      <h1>Buy Items</h1>
      <div>
        <Link to="/payment" className="buy-button">Buy with Visa</Link>
        <button onClick={handleBuyWithWallet} className="buy-button">Buy with Wallet</button>
      </div>

      {/* Display the wallet balance */}
      <p>Wallet Balance: ${walletBalance}</p>

      {/* Display the error message */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default BuyPage;
