import React, { useState, useEffect } from 'react';

const AddPrescription = () => {
    const [username, setUsername] = useState('');
    const [medicines, setMedicines] = useState([]);
    const [medicineName, setMedicineName] = useState('');
    
    const [date, setDate] = useState('');
    const [doctor, setDoctor] = useState('');
    const [filled, setFilled] = useState('');
    const [error, setError] = useState(null);
    const [availableMedicines, setAvailableMedicines] = useState([]);

    const addMedicine = () => {
        // Check if medicineName is not empty
        if (medicineName.trim() !== '') {
            const newMedicine = { name: medicineName};
            setMedicines([...medicines, newMedicine]);
            setMedicineName('');
           
        }
    };

    
    
  const fetchAvailableMedicines = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/prescription/check-medicines');
      if (response.ok) {
        const data = await response.json();
        setAvailableMedicines(data);
      } else {
        console.error('Failed to fetch available medicines.');
      }
    } catch (error) {
      console.error('Error fetching available medicines:', error);
    }
  };



  const handleCheckAllMedicines = () => {
    // Fetch available medicines when the button is clicked
    fetchAvailableMedicines();
  };

    const handleSubmit = async (e) => {
        const doctor = localStorage.getItem('username');
        e.preventDefault();

        const prescription = { username, medicines, date, doctor, filled };

        const response = await fetch('http://localhost:4000/api/prescription/create-prescription', {
            method: 'POST',
            body: JSON.stringify(prescription),
            headers: { 'Content-Type': 'application/json' }
        });

        const json = await response.json();

        if (!response.ok) {
            setMedicines([]);
            setDate('');
            setDoctor('');
            setUsername('');
            setError(json.error);
        }
        if (response.ok) {
            setMedicines([]);
            setDate('');
            setDoctor('');
            setUsername('');
            setError(null);
             // Show notification
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Prescription added');
        } else if ('Notification' in window && Notification.permission !== 'denied') {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    new Notification('Prescription added');
                }
            });
        }
            console.log('Success:', json);
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add new prescription</h3>

            <label>Patient Username:</label>
            <input type="text" placeholder="Enter patient's username" value={username} onChange={(e) => setUsername(e.target.value)} />


            <label>Date:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <div>
                <label>Medicine Name:</label>
                <input type="text" placeholder="Enter medicine name" value={medicineName} onChange={(e) => setMedicineName(e.target.value)} />
               
               
                <button type="button" onClick={addMedicine}style={{ marginRight: '10px' }}>Add Medicine</button>
                <button type="button" onClick={handleCheckAllMedicines}>
        Check All Medicines
      </button>
            </div>
            <h4 style = {{marginTop: '20px', marginBottom: '20px'}}> Added Medicines:</h4>
            <ul style = {{marginTop: '20px', marginBottom: '20px'}}>
                {medicines.map((medicine, index) => (
                    <li key={index}>{medicine.name} </li>
                ))}
            </ul>

           

     

      {/* Render available medicines */}
      {availableMedicines.length > 0 && (
  <div style={{ marginTop: '20px', marginBottom: '20px' }}>
    <h4>Available Medicines in the Pharmacy</h4>
    <ul>
      {availableMedicines.map((medicine, index) => (
        <li key={index}>{medicine.name}</li>
      ))}
    </ul>
  </div>
)}

    
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Submit</button>
        </form>
    );
};

export default AddPrescription;
