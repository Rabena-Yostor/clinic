// BuyPage.js
import React from 'react';

const BuyPage = () => {
  return (
    <div>
      <h1>Buy Items</h1>
      <div>
        <button onClick={() => handleBuyWithVisa()}>Buy with Visa</button>
        <button onClick={() => handleBuyWithWallet()}>Buy with Wallet</button>
      </div>
    </div>
  );
};

const handleBuyWithVisa = () => {
    console.log('Button clicked');
    fetch('/api/stripe/create-payment-intent', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({ 
         items: [{ id:1 }]
      })
   }).then(res =>{
     if(res.ok) return res.json()
     return res.json().then(json => Promise.reject(json))
 
     }).then(({url})=>{
         //console.log(url)
         window.location = url
   }).catch(e=>{
       console.error(e.error)
   })  
  // Implement Visa payment logic here

};

const handleBuyWithWallet = () => {
  // Implement wallet payment logic here
  console.log('Buying with Wallet...');
};

export default BuyPage;
