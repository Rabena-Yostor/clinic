import React, { useState, useEffect } from 'react';
import { FaUserTimes } from 'react-icons/fa';

const RejectDoctorRequest = () => {
    const [pendingDoctors, setPendingDoctors] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchPendingDoctors = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/admin/viewRequests');
                const data = await response.json();
                if (response.ok) {
                    setPendingDoctors(data);
                } else {
                    setMessage(data.error);
                }
            } catch (error) {
                console.error('Error fetching pending doctors:', error);
                setMessage('Internal Server Error');
            }
        };

        fetchPendingDoctors();
    }, []);

    const handleRejectRequest = async (doctorId) => {
        try {
            const response = await fetch(`http://localhost:4000/api/admin/rejectRequests`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ doctorId }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                setPendingDoctors(pendingDoctors.filter(doctor => doctor._id !== doctorId));
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
                <p>Select a doctor request to reject.</p>
            </section>

            <section className="form">
    {pendingDoctors.map(pendingDoctor => (
        <div key={pendingDoctor._id} className="pending-doctor">
            <p>{pendingDoctor.name} - ID: {pendingDoctor._id}</p> {/* Directly access name from pendingDoctor */}
            <button onClick={() => handleRejectRequest(pendingDoctor._id)} className="btn btn-primary">
                Reject Request
            </button>
        </div>
    ))}
    {message && <p className={message.includes('successfully') ? 'success-message' : 'error-message'}>{message}</p>}
</section>

        </>
    );
};

export default RejectDoctorRequest;
