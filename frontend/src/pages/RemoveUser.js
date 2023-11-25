import React, { useState } from 'react';

const RemoveUserForm = () => {
  const [userType, setUserType] = useState('');
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleRemoveUser = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/admin/removeUser', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userType, userId }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.error('Internal Server Error:', error);
      setMessage('Error occurred while removing user');
    }
  };

  return (
    <div className="RemoveUserForm">
      <h2>Remove User</h2>
      <select value={userType} onChange={(e) => setUserType(e.target.value)}>
        <option value="">Select User Type</option>
        <option value="doctor">Doctor</option>
        <option value="patient">Patient</option>
        <option value="admin">Admin</option>
      </select>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleRemoveUser}>Remove User</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RemoveUserForm;
