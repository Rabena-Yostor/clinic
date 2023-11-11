import React, { useState } from 'react';
import { FaUserTimes } from 'react-icons/fa';

const RejectDoctorRequest = () => {
    const [doctorId, setDoctorId] = useState('');
    const [message, setMessage] = useState('');
  
    const handleDoctorIdChange = (e) => {
      setDoctorId(e.target.value);
    };
  
    const handleRejectRequest = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch(`http://localhost:4000/api/admin/rejectRequests`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ doctorId }), // Include the doctorId in the request body
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setMessage(data.message);
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            console.error('Error during rejection:', error);
            setMessage('Internal Server Error');
        }
    };

  return (
    <>
      <section className="Heading">
        <h1>
          <FaUserTimes /> Reject Doctor Request
        </h1>
        <p>Enter doctor ID to reject the request.</p>
      </section>

      <section className="form">
        <form onSubmit={handleRejectRequest}>
          <div className="form-group">
            <label htmlFor="doctorId">Doctor ID:</label>
            <input
              type="text"
              className="form-control"
              id="doctorId"
              name="doctorId"
              value={doctorId}
              placeholder="Enter Doctor ID"
              onChange={handleDoctorIdChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Reject Request
          </button>
        </form>
        {message && <p className={message.includes('successfully') ? 'success-message' : 'error-message'}>{message}</p>}
      </section>
    </>
  );
};

export default RejectDoctorRequest;
