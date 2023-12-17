import React, { useState, useEffect } from 'react';

const SubscribeToHealthPackage = () => {
    const [formData, setFormData] = useState({
        patientId: '',
        healthPackageId: '',
        familyMembers: '',
        paymentMethod: '',
        accountNumber: '',
    });
    const [healthPackages, setHealthPackages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchHealthPackages();
        setPatientIdFromCredentials();
    }, []);
    const setPatientIdFromCredentials = () => {
        // Replace this with your method of retrieving the patient ID
        const patientIdFromSession = 'Retrieved ID'; // Example: sessionStorage.getItem('patientId');
        setFormData({...formData, patientId: patientIdFromSession});
    };

    const fetchHealthPackages = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/patient/viewHealthPackage');
            const data = await response.json();
            if (response.ok) {
                setHealthPackages(data);
            } else {
                console.error('Error fetching health packages:', data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/api/patient/subscribeHealthPackage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    patientId: formData.patientId,
                    healthPackageId: formData.healthPackageId,
                    familyMembers: formData.familyMembers,
                    paymentMethod: formData.paymentMethod.trim(), // Trim the paymentMethod value here
                    accountNumber: formData.accountNumber,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                // Reset form fields if the subscription is successful
                setFormData({
                    patientId: '',
                    healthPackageId: '',
                    familyMembers: '',
                    paymentMethod: '',
                    accountNumber: '',
                });
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            console.error('Error subscribing to health package:', error);
            setMessage('Internal Server Error');
        }    };

    return (
        <div className="container">
            <h2>Subscribe to Health Package</h2>
            <form onSubmit={handleSubmit}>
                {/* existing form fields... */}
                <div className="form-group">
                    <label htmlFor="healthPackageId">Health Package:</label>
                    <select
                        id="healthPackageId"
                        name="healthPackageId"
                        value={formData.healthPackageId}
                        onChange={handleInputChange}
                        required
                    >
                       <option value="">Select a Package</option>
                        {healthPackages.map((pkg) => (
                            <option key={pkg._id} value={pkg._id}>
                                {`${pkg.type.charAt(0).toUpperCase() + pkg.type.slice(1)} - $${pkg.price}`}
                            </option>
                        ))}
                    </select>
                </div>
              
                <div className="form-group">
                    <label htmlFor="familyMembers">Family Members:</label>
                    <input
                        type="text"
                        id="familyMembers"
                        name="familyMembers"
                        value={formData.familyMembers}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="paymentMethod">Payment Method:</label>
                    <input
                        type="text"
                        id="paymentMethod"
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="accountNumber">Account Number:</label>
                    <input
                        type="text"
                        id="accountNumber"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Subscribe</button>
              </form>
            {/* existing message display... */}
        </div>
    );
};

export default SubscribeToHealthPackage;
