import React ,{useEffect, useState } from 'react'
import {FaUser} from 'react-icons/fa'

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        dateOfBirth: '',
        gender: '',
        mobileNumber: '',
        EmergencyContactName: '',
        EmergencyContactNo: ''
    });

    const { username, name, email, password, dateOfBirth, gender, mobileNumber, EmergencyContactName, EmergencyContactNo } = formData;

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
        const requiredFields = ['username', 'name', 'email', 'password', 'dateOfBirth', 'gender', 'mobileNumber', 'EmergencyContactName', 'EmergencyContactNo'];
        const missingFields = requiredFields.filter(field => !formData[field]);
    
        if (missingFields.length > 0) {
            console.error('Registration failed: Please fill out all fields');
            // Optionally, display an error message to the user about missing fields
            return;
        }
    
        try {
            const response = await fetch('http://localhost:4000/api/patient/createPatient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log('Registration successful:', data);
                // Optionally, redirect to a success page or perform other actions
            } else {
                console.error('Registration failed:', data.error);
                // Handle registration failure, e.g., display an error message to the user
            }
        } catch (error) {
            console.error('Error during registration:', error);
            // Handle network or other errors during registration
        }
    };
    
    return (
        <>
            <section className="Heading">
                <h1>
                    <FaUser /> Register
                </h1>
                <p> Please create an account</p>
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
                        <label htmlFor="dateOfBirth">Date of Birth:</label>
                        <input
                            type="date"
                            className="form-control"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Gender:</label>
                        <select
                            className="form-control"
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={onChange}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobileNumber">Mobile Number:</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="mobileNumber"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            placeholder="Enter your mobile number"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="EmergencyContactName">Emergency Contact Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="EmergencyContactName"
                            name="EmergencyContactName"
                            value={formData.EmergencyContactName}
                            placeholder="Enter emergency contact name"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="EmergencyContactNo">Emergency Contact Number:</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="EmergencyContactNo"
                            name="EmergencyContactNo"
                            value={formData.EmergencyContactNo}
                            placeholder="Enter emergency contact number"
                            onChange={onChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                    
                </form>
            </section>
        </>
    );
};

export default Register;
