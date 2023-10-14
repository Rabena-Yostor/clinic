import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PrescriptionList from '../components/PrescriptionList';

import PatientFormm from '../components/PatientFormm';

function Home() {




  return (
    <div>
      <h1>Welcome, Patient</h1>
      <p>This is your personal patient dashboard.</p>
      <div>
        <PatientFormm />
        
      </div>
    </div>
  );
}

export default Home;
