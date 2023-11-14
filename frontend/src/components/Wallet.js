import React, { useState, useEffect } from 'react';

const Wallet = () => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [amount, setAmount] = useState(0);

  // Function to fetch the wallet balance from the server
  const fetchWalletBalance = async () => {
    try {
      const response = await fetch('/api/patient/getWalletBalance');
      const data = await response.json();
      setWalletBalance(data.walletBalance);
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
    }
  };

  // Function to handle deposit
  const handleDeposit = async () => {
    if (amount <= 0) return;
    try {
      const response = await fetch('/api/patient/depositToWallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });
      const data = await response.json();
      if (data.message) {
        fetchWalletBalance(); // Refresh the wallet balance
        alert(data.message);
      }
    } catch (error) {
      console.error('Error depositing funds:', error);
    }
  };

  // Function to handle withdrawal
  const handleWithdraw = async () => {
    if (amount <= 0) return;
    try {
      const response = await fetch('/api/patient/withdrawFromWallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });
      const data = await response.json();
      if (data.message) {
        fetchWalletBalance(); // Refresh the wallet balance
        alert(data.message);
      }
    } catch (error) {
      console.error('Error withdrawing funds:', error);
    }
  };

  useEffect(() => {
    fetchWalletBalance(); // Fetch the wallet balance when the component mounts
  }, []);

  return (
    <div>
      <h3>Wallet Balance: ${walletBalance.toFixed(2)}</h3>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
        <button onClick={handleDeposit}>Deposit</button>
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>
    </div>
  );
};

export default Wallet;
