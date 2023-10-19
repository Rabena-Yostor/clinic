import React, { useState } from 'react';

function AddAdminForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/admin/addAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log('Admin added successfully');
        // Handle success, e.g., navigate to another page or show a success message
      } else {
        console.error('Admin addition failed');
        // Handle error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Error adding admin:', error);
      // Handle network error, show an error message to the user, etc.
    }
  };

  return (
    <div className="AddAdminForm">
      <h1>Add Admin</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Admin</button>
      </form>
    </div>
  );
}

export default AddAdminForm;

