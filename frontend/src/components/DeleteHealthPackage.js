import React, { useState } from 'react';

const DeleteHealthPackage = () => {
    const [healthPackageId, setHealthPackageId] = useState('');
    const [response, setResponse] = useState(null);
  
    const handleChange = (e) => {
      setHealthPackageId(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:4000/api/admin/deleteHP', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ healthPackageId })
        });
        const data = await response.json();
  
        if (response.ok) {
          setResponse('Health package deleted successfully!');
        } else {
          setResponse(`Error deleting health package: ${data.error}`);
        }
      } catch (error) {
        console.error('Error deleting health package:', error);
        setResponse('Internal Server Error');
      }
    };
    
  return (
    <div className="container">
      <h2>Delete Health Package</h2>
      <form onSubmit={handleSubmit}>
        {/* Form field for health package ID */}
        <input type="text" placeholder="Health Package ID" value={healthPackageId} onChange={handleChange} required /><br />
        <button type="submit">Delete Health Package</button>
      </form>
      {response && <div>{JSON.stringify(response)}</div>}
    </div>
  );
};

export default DeleteHealthPackage;
