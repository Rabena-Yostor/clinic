// import React, { useState } from 'react';
// import { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import PrescriptionList from '../components/PrescriptionList';

// import { usePrescriptionsContext } from '../hooks/usePrescriptionsContext';

// import PatientFormm from '../components/PatientFormm';

// const Home = () => {

//   const { prescriptions, dispatch } = usePrescriptionsContext();


//   useEffect(()=> {
//     const fetchPrescriptions = async () => {
//       const response = await fetch('http://localhost:4000/api/routers/');
//       const data = await response.json();
//       if(response.ok) {
//       dispatch({type: 'SET_PRESCRIPTION', payload: data})
//       }
//     }
//     fetchPrescriptions();
//     },[])



//   return (
//     <div>
//       <h1>Welcome, Patient</h1>
//       <p>This is your personal patient dashboard.</p>
//       <div>
//         <PatientFormm />

//       </div>
//     </div>
//   );
// }

// export default Home;


import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome, Patient</h1>
      <p>This is your personal patient dashboard.</p>
      <div>
        <Link to="/prescriptions">
          <button>View All Prescriptions</button>
        </Link>
        <Link to="/filter-prescriptions">
          <button>Filter Prescriptions</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
