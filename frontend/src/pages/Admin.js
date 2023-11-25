// Admin.js
import React, { useEffect } from 'react';
import { useAdminContext } from '../context/AdminContext';

const Admin = () => {
  const { state, dispatch } = useAdminContext();



  useEffect(() => {
    const fetchData = async () => {
      
        const response = await fetch('http://localhost:4000/api/admin/all');
        const data = await response.json();

        if (response.ok) {
          dispatch({ type: 'SET_REQUESTS', payload: data });
        }
      
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="Admin">
      <h1>Pending Doctor Requests</h1>
      <ul>
        {state.requests.map(request => (
          <li key={request._id}>
            <strong>Username:</strong> {request.username}<br />
            <strong>Name:</strong> {request.name}<br />
            <strong>Email:</strong> {request.email}<br />
            <strong>Password:</strong> {request.password}<br />
            <strong>Date of Birth:</strong> {request.dateOfBirth}<br />
            <strong>Hourly Rate:</strong> {request.hourlyRate}<br />
            <strong>Affiliation (Hospital):</strong> {request.affiliation}<br />
            <strong>Educational Background:</strong> {request.educationalBackground}<br />
            {/* Add more fields as needed */}
            <hr />
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default Admin;

