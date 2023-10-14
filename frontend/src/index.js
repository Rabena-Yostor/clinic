import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {PrescriptionsContextProvider} from './context/PrescriptionContext'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PrescriptionsContextProvider>
    <App />
    </PrescriptionsContextProvider>
  </React.StrictMode>

);
