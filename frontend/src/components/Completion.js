import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Completion(props) {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { id } = useParams();

    const handlePayWithCard = async () => {
        try {
            const username = localStorage.getItem('username'); // Replace with the actual username or get it dynamically

            const response = await fetch(`http://localhost:4000/api/patient/filledYes/${id}`, {
                method: 'PUT',
            });

            if (!response.ok) {
                const data = await response.json();
                setErrorMessage(data.message); // Display the error message on the frontend
                setSuccessMessage(''); // Clear any existing success message
                return;
            }

            const data = await response.json();
            setSuccessMessage(data.message); // Display the success message on the frontend
            setErrorMessage(''); // Clear any existing error message

            // Optionally, you can update the state or perform other actions based on the response

            // Reload the page after 1 second
            setTimeout(() => {
                window.location.href = '/hamouda';
            }, 1000);
        } catch (error) {
            console.error('Error paying cash with card stripe:', error);
            setErrorMessage('Something went wrong. Please try again.'); // Display a generic error message
            setSuccessMessage(''); // Clear any existing success message
        }
    };

    return (
        <div style={{ margin: '200px' }}>
            <h1>Thank you! 🎉</h1>
            <h2>Your payment succeeded!</h2>
            <button type="button" onClick={handlePayWithCard} style={{ marginLeft: '-5px', marginBottom: '20px', marginTop: '100px' }}>
                Return to Prescription Page
            </button>
        </div>
    );
}

export default Completion;
