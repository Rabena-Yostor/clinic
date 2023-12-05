import React, { useState, useEffect } from 'react';

function UpdatePrescription() {
    const [prescriptions, setPrescriptions] = useState([]);
    const [selectedPrescriptionId, setSelectedPrescriptionId] = useState('');
    const [updateData, setUpdateData] = useState({ /* structure based on what needs to be updated */ });
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch all prescriptions
        const fetchPrescriptions = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/prescriptions');
                const data = await response.json();
                setPrescriptions(data);
            } catch (error) {
                console.error('Error fetching prescriptions:', error);
            }
        };

        fetchPrescriptions();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const selectedPrescription = prescriptions.find(p => p._id === selectedPrescriptionId);
        if (!selectedPrescription) {
            setMessage('Prescription not found.');
            return;
        }

        if (selectedPrescription.filled) {
            setMessage('This prescription is already submitted to the pharmacy.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/prescriptions/${selectedPrescriptionId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData)
            });

            if (response.ok) {
                setMessage('Prescription updated successfully.');
                // Optionally re-fetch prescriptions here to update the list
            } else {
                setMessage('Failed to update prescription.');
            }
        } catch (error) {
            console.error('Error updating prescription:', error);
            setMessage('Error while updating prescription.');
        }
    };

    return (
        <div>
            <h2>Update Prescription</h2>
            {message && <p>{message}</p>}
            <div>
                <label>
                    Select Prescription:
                    <select value={selectedPrescriptionId} onChange={(e) => setSelectedPrescriptionId(e.target.value)}>
                        <option value="">Select a Prescription</option>
                        {prescriptions.map(prescription => (
                            <option key={prescription._id} value={prescription._id}>
                                {prescription.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <form onSubmit={handleUpdate}>
                {/* Add input fields for the update data here */}
                <button type="submit">Update Prescription</button>
            </form>
        </div>
    );
}

export default UpdatePrescription;
