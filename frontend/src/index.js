import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { WorkoutsContextProvider } from './context/WorkoutContext';
import { AdminContextProvider } from './context/AdminContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <WorkoutsContextProvider>
      <AdminContextProvider>
        <App />
      </AdminContextProvider>
    </WorkoutsContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
