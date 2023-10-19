import React, { useState, useEffect } from 'react';
import { usePrescriptionsContext } from '../hooks/usePrescriptionsContext';

const PrescriptionDetails = ({ prescription }) => {
  const { dispatch } = usePrescriptionsContext();
  const [userPrescriptions, setUserPrescriptions] = useState([]);

  useEffect(() => {
    // Fetch the user's prescriptions when the component mounts
    const fetchUserPrescriptions = async () => {
      try {
        // Replace 'username' with the actual username of the user
        const username = 'johndoe'; // You can get the username from your context or a user session
        const response = await fetch(`http://localhost:4000/api/prescription/get-prescriptions/${username}`);
        if (response.ok) {
          const data = await response.json();
          setUserPrescriptions(data.prescriptions);
        } else {
          console.error('Failed to fetch user prescriptions');
        }
      } catch (error) {
        console.error('Error fetching user prescriptions:', error);
      }
    };

    fetchUserPrescriptions();
  }, []); // Empty dependency array ensures this runs only once when the component mounts



  return (
    <div>
      {/* Display user's prescriptions */}
      <h2>User's Prescriptions</h2>
      <ul>
        {userPrescriptions.map((userPrescription) => (
          <li key={userPrescription._id}>
            {userPrescription.name} - {userPrescription.date}
          </li>
        ))}
      </ul>

      {/* Add your click event handling logic here */}
    </div>
  );
};

export default PrescriptionDetails;
