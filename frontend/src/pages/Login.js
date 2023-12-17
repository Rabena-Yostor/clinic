// Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('doctor'); // Default to pharmacist


    const handleLogin = async (e) => {
        e.preventDefault();
    
        const userEndpoints = [
            { type: 'doctor', endpoint: '/api/doctors/login' },
            { type: 'admin', endpoint: '/api/admin/login' },
            { type: 'patient', endpoint: '/api/patient/login' }
        ];
        const credentials = JSON.stringify({ username, password });
    
        for (const { type, endpoint } of userEndpoints) {
            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: credentials
                });
    
                if (response.status === 200) {
                    const data = await response.json();
                    localStorage.setItem('userType', type);
                    localStorage.setItem('username', username);
                    localStorage.setItem('password', password);
    
                    switch (type) {
                        case 'doctor':
                            navigate('/DoctorHomePage');
                            return;
                        case 'admin':
                            navigate('/AdminHome');
                            return;
                        case 'patient':
                            navigate('/PatientHome');
                            return;
                        default:
                            break;
                    }
                }
            } catch (error) {
                console.error('Error during login:', error.message);
            }
        }
    
        console.error('Invalid username or password');
    };
    
    
    const handleResetPassword = () => {
        // Navigate to the reset-password path
        navigate('/reset-password');
      };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
               
                <br />
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="submit">Login</button>
                <p></p>
                <br />
            </form>
            <button onClick={handleResetPassword}>Reset Password</button>
            <p></p>
            <br />
            <div>
                <Link to ="/signUp">
                    <button>Sign up</button>
                    
                    </Link>
                    
                    <br />
                    <br />
                    <br />
            </div>
<p>If you want to Submit a request and become a doctor</p>
<br />
            <div>
                <Link to="/SubmitRequest">
                    <button> Submit Request</button>
                </Link>

            </div>
            <div>
                <Link to="/RegisterAsPatient">
                    <button> Register as Patient</button>
                </Link>
            </div>
        </div>
    );
};

export default Login;