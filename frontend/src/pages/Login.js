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

        try {

            if (userType === 'doctor') {
                var response = await fetch('/api/doctors/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({username : username, password: password }),
                });
            } else if (userType === 'admin') {
                var response = await fetch('/api/admin/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });
            }else{
                var response = await fetch('/api/patient/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });
                
            }
            const data = await response.json();
                console.log("data is ",data)
            if (response.status === 200) {
                
                  localStorage.setItem('userType', userType);
                  localStorage.setItem('username', username);
                  localStorage.setItem('password', password);
                  if (userType === 'doctor') {
                    navigate('/DoctorHomePage'); // Adjust the path based on your routes
                } else if (userType === 'admin') {
                    navigate('/AdminHome'); // Adjust the path based on your routes
                } else {
                    const username = data.user.username;

            // Store the user ID in local storage
localStorage.setItem('username', username);
console.log('Stored username in local storage:', username);
                    navigate('PatientHome'); // Adjust the path based on your routes
                }
               
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error(error.message);
        }
    };
    const handleResetPassword = () => {
        // Navigate to the reset-password path
        navigate('/reset-password');
      };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label>
                    User Type:
                    <select value={userType} onChange={(e) => setUserType(e.target.value)}>
                        <option value="doctor">Doctor</option>
                        <option value="admin">Admin</option>
                        <option value="Patient">Patient</option> 
                    </select>
                </label>
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
                
            </form>
            <button onClick={handleResetPassword}>Reset Password</button>

            <div>
                <Link to ="/signUp">
                    <button>Sign up</button>
                    </Link>

            </div>
<p>If you want to Submit a request and become a doctor</p>
            <div>
                <Link to="/SubmitRequest">
                    <button> SubmitRequest</button>
                </Link>

            </div>
        </div>
    );
};

export default Login;