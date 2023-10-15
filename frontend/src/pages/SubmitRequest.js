
import React, { useState } from 'react';
import { FaUserMd } from 'react-icons/fa';

const SubmitRequest= () =>{
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        dateofbirth: '',
        hourlyrate: '',
        affiliation: '',
        educationalbackground: '',
    });
    const { username, name, email, password, dateofbirth, hourlyrate, affiliation, educationalbackground } = formData;

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));


    };
    const onSubmit = async (e) => {
        e.preventDefault();
    
        // Client-side validation
        const requiredFields = ['username', 'name', 'email', 'password', 'dateofbirth', 'hourlyrate', 'affiliation', 'educationalbackground'];
        const missingFields = requiredFields.filter((field) => !formData[field]);
    
        if (missingFields.length > 0) {
            console.error('Registration failed: Please fill out all fields');
            // Optionally, display an error message to the user about missing fields
            return;
        }
    
        try {
            const response = await fetch('http://localhost:4000/api/patients/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log('Registration request sent successfully:', data);
                // Optionally, redirect to a success page or perform other actions
            } else {
                console.error('Registration request failed:', data.error);
                // Handle registration request failure, e.g., display an error message to the user
            }
        } catch (error) {
            console.error('Error during registration request:', error);
            // Handle network or other errors during registration request
        }
    };
    

    return (
        <>
            <section className="Heading">
                <h1>
                    <FaUserMd /> Submit Request
                </h1>
                <p> Please provide your information to submit a registration request.</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={formData.username}
                            placeholder="Enter your username"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            placeholder="Enter your name"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            placeholder="Enter your email"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            placeholder="Enter your password"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateofbirth">Date of Birth:</label>
                        <input
                            type="date"
                            className="form-control"
                            id="dateofbirth"
                            name="dateofbirth"
                            value={formData.dateofbirth}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="hourlyrate">Hourly Rate:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="hourlyrate"
                            name="hourlyrate"
                            value={formData.hourlyrate}
                            placeholder="Enter your hourly rate"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="affiliation">Hospital Affiliation:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="affiliation"
                            name="affiliation"
                            value={formData.affiliation}
                            placeholder="Enter your hospital affiliation"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="educationalbackground">Educational Background:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="educationalbackground"
                            name="educationalbackground"
                            value={formData.educationalbackground}
                            placeholder="Enter your educational background"
                            onChange={onChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit Request</button>
                </form>
                
            </section>
        </>
    );
};

export default SubmitRequest;