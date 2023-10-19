import { useState } from 'react';

const prescriptionForm = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [grams, setGrams] = useState('');
    const [date, setDate] = useState('');
    const [doctor, setDoctor] = useState('');
    const [filled, setFilled] = useState('');
    const[error, setError] = useState(null);

    const handleSubmit = async(e) => { 
        e.preventDefault();

        const prescription = { username,name, price, grams, date, doctor, filled  };

        const response = await fetch('http://localhost:4000/api/prescription/create-prescription', {
            method: 'POST',
            body: JSON.stringify(prescription),
            headers: { 'Content-Type': 'application/json' }
        });
        const json = await response.json();

        if(!response.ok) {
            setError(json.error);
        }
        if(response.ok){
            setName('');
            setPrice('');
            setGrams('');
            setDate('');
            setDoctor('');
            setFilled('');
            setUsername('');
            setError(null)
            console.log('Success:', json);
        }
    }
    return (
        <form className="create" onSubmit = {handleSubmit}>
            <h3>Add new prescription</h3>

            <label>Patient Username:</label>
            <input type="text" placeholder="Enter patient's username" value={username} onChange={(e) => setUsername(e.target.value)} />


            <label>Prescription Name:</label>
            <input type="text" placeholder="Enter prescription name" value={name} onChange={(e) => setName(e.target.value)} />

            <label>Price:</label>
            <input type="number" placeholder="Enter price of prescription" value={price} onChange={(e) => setPrice(e.target.value)} />

            <label>Grams:</label>
            <input type="number" placeholder="Enter grams of prescription" value={grams} onChange={(e) => setGrams(e.target.value)} />

            <label>Date:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

            <label>Doctor:</label>
            <input type="text" placeholder="Enter doctor's name" value={doctor} onChange={(e) => setDoctor(e.target.value)} />

            <label>Filled:</label>
            <input type="checkbox" checked={filled} onChange={(e) => setFilled(e.target.checked)} />

            <button type="submit">Submit</button>
        </form>
    );
};

export default prescriptionForm;