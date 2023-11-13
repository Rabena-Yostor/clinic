import React, { useState } from 'react';
import { FaUserCheck } from 'react-icons/fa';

const ApproveDoctorRequest = () => {
  const [doctorId, setDoctorId] = useState('');
  const [message, setMessage] = useState('');

  const handleDoctorIdChange = (e) => {
    setDoctorId(e.target.value);
  };

  const handleApproveRequest = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/admin/approveRequests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doctorId }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.error('Error during approval:', error);
      setMessage('Internal Server Error');
    }
  };

  return (
    <>
      <section className="Heading">
        <h1>
          <FaUserCheck /> Approve Doctor Request
        </h1>
        <p>Enter doctor ID to approve the request.</p>
      </section>

      <section className="form">
        <form onSubmit={handleApproveRequest}>
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
            Approve Request
          </button>
        </form>
        {message && <p className={message.includes('successfully') ? 'success-message' : 'error-message'}>{message}</p>}
      </section>
    </>
  );
};

export default ApproveDoctorRequest;
