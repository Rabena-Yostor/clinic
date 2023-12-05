import React, { useState, useEffect } from 'react';

function PrescriptionsViewer() {
    const [prescriptions, setPrescriptions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Retrieve the logged-in user's username from localStorage
        const loggedInUsername = localStorage.getItem('username');

        // If a username exists, fetch prescriptions for that user
        if (loggedInUsername) {
            fetchPrescriptions(loggedInUsername);
        } else {
            // Handle case where no user is logged in
            setError('No user is logged in.');
        }
    }, []);

    const fetchPrescriptions = async (username) => {
        try {
            const response = await fetch(`http://localhost:4000/api/patient/ViewPrescriptions/${username}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setPrescriptions(data);
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div>
            {error && <p>Error: {error}</p>}
            <ul>
            {prescriptions.map((prescription, index) => (
                    <li key={index}>
                        <p>Name: {prescription.name}</p>
                        <p>Price: {prescription.price}</p>
                        <p>Grams: {prescription.grams}</p>
                        <p>Date: {prescription.date}</p>
                        <p>Doctor: {prescription.doctor}</p>
                        <p>Status: {prescription.filled ? 'Filled' : 'Not Filled'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PrescriptionsViewer;
