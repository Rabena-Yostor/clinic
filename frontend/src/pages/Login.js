import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        console.log(JSON.stringify({ username, password }));
      const userTypes = ['admin', 'doctors', 'patient'];

      for (const userType of userTypes) {
        const response = await fetch(`http://localhost:4000/api/${userType}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        console.log(response);
        if (response.ok) {
          const userData = await response.json();
          console.log(userData);

          // Store user data in local storage based on user type
          switch (userType) {
            case 'admin':
              localStorage.setItem('adminToken', userData.token);
              localStorage.setItem('adminData', JSON.stringify(userData));
              break;
            case 'doctors':
              localStorage.setItem('doctorToken', userData.token);
              localStorage.setItem('doctorData', JSON.stringify(userData));
              break;
            case 'patient':
              localStorage.setItem('patientToken', userData.token);
              localStorage.setItem('patientData', JSON.stringify(userData));
              break;
            default:
              break;
          }

          localStorage.setItem('userType', userType);
          localStorage.setItem('username', username);
          navigate(`/landing`);
          return;
        }
      }

      // If all login attempts fail, show an error message
      console.error('Authentication failed');
    } catch (error) {
      console.error('Authentication failed', error);
    }
  };
  const handleForgotPassword = () => {
    // Redirect to the reset password page
    navigate('/reset-password');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <div>
        <p>Forgot your password?</p>
        <button onClick={handleForgotPassword}>Reset Password</button>
      </div>
    </div>
  );
};

export default Login;
