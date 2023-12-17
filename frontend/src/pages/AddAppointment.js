import React, { useState, useEffect } from 'react';

const AddAppointment = () => {
    const [username, setUsername] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');

    useEffect(() => {
        // Retrieve the username from local storage
        const loggedInUsername = localStorage.getItem('username');
        if (loggedInUsername) {
            setUsername(loggedInUsername);
        } else {
            console.log('No username found in local storage');
            // You might want to handle this case, perhaps by redirecting to the login page
        }
    }, []);
    // Handle appointment date change
    const handleDateChange = (e) => {
       
        setAppointmentDate(e.target.value);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare data for the API call
        const appointmentData = {
            username, // Use the username from the state
            date: appointmentDate,
        };

        // Make an API call to add an appointment
        console.log(appointmentData); // Add this line before fetch call

        const response = await fetch('/api/doctors/addAppointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointmentData),
        });

        if (response.ok) {
            console.log('Appointment added successfully');
            // Handle success
        } else {
            console.error('Failed to add appointment');
            // Handle error
        }
    };

    return (
        <div className="add-appointment">
            <h1>Add Available Slots</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="datetime-local"
                    name="date"
                    value={appointmentDate}
                    onChange={handleDateChange}
                />
                <button type="submit">Add Appointment</button>
            </form>
        </div>
    );
};

export default AddAppointment;
