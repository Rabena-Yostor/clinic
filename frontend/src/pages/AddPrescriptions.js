import React, { useState } from 'react';
import axios from 'axios';
import { ChakraProvider } from '@chakra-ui/react'

const PrescriptionForm = () => {
    
    const [prescription, setPrescription] = useState({
        name: '',
        price: '',
        grams: '',
        date: '',
        doctor: '',
        filled: false,
        patientUsername: ''
    });

    const handleChange = (e) => {
        const updatedPrescription = { ...prescription, [e.target.name]: e.target.value };
        console.log("Updated state:", updatedPrescription);
        setPrescription(updatedPrescription);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting prescription:", prescription);
        try {
            const response=await axios.post(`http://localhost:4000/api/doctors/addprescription`, prescription);
            console.log("Response from the server:", response);
            alert('Prescription added successfully');
            // Reset the form or handle the success scenario
        } catch (error) {
            console.error('Error adding prescription:', error);
            console.log("Error details:", error.response);
            alert('Failed to add prescription');
        }
    };

    return (
        <ChakraProvider>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={prescription.name}
                onChange={handleChange}
                placeholder="Medication Name"
                required
            />
            <input
                type="number"
                name="price"
                value={prescription.price}
                onChange={handleChange}
                placeholder="Price"
                required
            />
            <input
                type="number"
                name="grams"
                value={prescription.grams}
                onChange={handleChange}
                placeholder="Grams"
                required
            />
            <input
                type="date"
                name="date"
                value={prescription.date}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="doctor"
                value={prescription.doctor}
                onChange={handleChange}
                placeholder="Doctor's Name"
                required
            />
            <input
                type="checkbox"
                name="filled"
                checked={prescription.filled}
                onChange={(e) => setPrescription({ ...prescription, filled: e.target.checked })}
            />
            <input
                type="text"
                name="patientUsername"
                value={prescription.patientUsername}
                onChange={handleChange}
                placeholder="Patient Username"
                required
            />
            <button type="submit">Add Prescription</button>
        </form>
        </ChakraProvider>
    );
};

export default PrescriptionForm;