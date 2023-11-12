import { useState } from 'react';

const PaymentPage = () => {
  const [paymentChoice, setPaymentChoice] = useState(null);
  const [amount, setAmount] = useState(100); // Example amount
  const userId = 'your_user_id_here'; // Replace with the actual user ID

  const handlePayment = async () => {
    try {
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, amount, method: paymentChoice }),
      });

      if (response.ok) {
        // Handle success
        console.log('Payment successful');
      } else {
        // Handle error
        console.error('Payment failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div>
        <label>
          <input
            type="radio"
            value="wallet"
            checked={paymentChoice === 'wallet'}
            onChange={() => setPaymentChoice('wallet')}
          />
          Pay with Wallet
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="creditCard"
            checked={paymentChoice === 'creditCard'}
            onChange={() => setPaymentChoice('creditCard')}
          />
          Pay with Credit Card
        </label>
      </div>
      <button onClick={handlePayment}>Pay</button>
    </div>
  );
};

export default PaymentPage;
