import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PatientsContextProvider } from './context/PatientContext';
import { AdminContextProvider } from './context/AdminContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PatientsContextProvider>
    <AdminContextProvider>
    <App />
    </AdminContextProvider>
    </PatientsContextProvider>
  </React.StrictMode>
);


