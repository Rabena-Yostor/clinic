//import { set } from 'mongoose';
import React, { useState } from 'react';
import { FaUserMd } from 'react-icons/fa';

const SubmitRequest= () =>{
    const [username,setUserName] = useState('')
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [dateOfBirth,setDateOfBirth] = useState('')
    const [hourlyRate,setHourlyRate] = useState('')
    const [affiliatedHospital,setAffiliatedHospital] = useState('')
    const [education,setEducation] = useState('')
    const [error,setError] = useState(null)
    const [idFile, setIdFile] = useState(null);
    const [degreeFile, setDegreeFile] = useState(null);
    const [licenseFile, setLicenseFile] = useState([]);
    // const [formData, setFormData] = useState({
    //     username: '',
    //     name: '',
    //     email: '',
    //     password: '',
    //     dateOfBirth: '',
    //     hourlyRate: '',
    //     affiliation: '',
    //     educationalBackground: '',
    //     idFile: '',
    //     degreeFile: '',
    //     licenseFile: '',
    // });
    //const { username, name, email, password, dateOfBirth, hourlyRate, affiliation, educationalBackground/*, idFile, degreeFile, licenseFile*/ } = formData;

    // const [errorMessage, setErrorMessage] = useState('');
    // const [successMessage, setSuccessMessage] = useState('');

    // const onChange = (e) => {
    //     setFormData((prevState) => ({
    //         ...prevState,
    //         [e.target.name]: e.target.value,
    //     }));}
    const onSubmit = async (e) => {
        e.preventDefault();
        // Client-side validation
        const formData = new FormData();
        formData.append('username', username);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('dateofbirth', dateOfBirth);
        formData.append('hourlyrate', hourlyRate);
        formData.append('affiliation', affiliatedHospital);
        formData.append('educationalbackground', education);
        formData.append('idFile', idFile);
        formData.append('degreeFile', degreeFile);
        formData.append('licenseFile', licenseFile);
        // const requiredFields = ['username', 'name', 'email', 'password', 'dateOfBirth', 'hourlyRate', 'affiliatedHospital', 'education'];
        // const missingFields = requiredFields.filter((field) => !formData[field]);
    
        // if (missingFields.length > 0) {
        //     console.error('Registration failed: Please fill out all fields');
        //     // Optionally, display an error message to the user about missing fields
        //     return;
        // }
    
        try {
            const response = await fetch('http://localhost:4000/api/doctors/submitRequest', {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                body: formData,
            });
    
            const data = await response
    
            if (response.ok) {
                console.log('Registration request sent successfully:', data);
                // Optionally, redirect to a success page or perform other actions
                // Clear form fields and files after successful submission
                setUserName('');
                setName('');
                setEmail('');
                setPassword('');
                setDateOfBirth('');
                setHourlyRate('');
                setAffiliatedHospital('');
                setEducation('');
                setIdFile(null);
                setDegreeFile(null);
                setLicenseFile(null);
                setError(null);
            } else {
                console.error('Registration request failed:', data.error);
                // Handle registration request failure, e.g., display an error message to the user
            }
        } catch (error) {
            console.error('Error during registration request:', error);
            // Handle network or other errors during registration request
        }
    };
    
    const handleIdFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setIdFile(file);
    };

    // Function to handle file input change for Degree file
    const handleDegreeFileChange = (e) => {
        const file = e.target.files[0];
        setDegreeFile(file);
    };

    // Function to handle file input change for License files (multiple)
    const handleLicenseFileChange = (e) => {
        const file = e.target.files[0];
        setLicenseFile(file);
    }

    return (
        <>
            <section className="Heading">
                <h1>
                    <FaUserMd /> Submit Request
                </h1>
                <p> Please provide your information to submit a registration request.</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={username}
                            placeholder="Enter your username"
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={name}
                            placeholder="Enter your name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateOfBirth">Date of Birth:</label>
                        <input
                            type="date"
                            className="form-control"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="hourlyRate">Hourly Rate:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="hourlyRate"
                            name="hourlyRate"
                            value={hourlyRate}
                            placeholder="Enter your hourly rate"
                            onChange={(e) => setHourlyRate(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="affiliation">Hospital Affiliation:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="affiliation"
                            name="affiliation"
                            value={affiliatedHospital}
                            placeholder="Enter your hospital affiliation"
                            onChange={(e) => setAffiliatedHospital(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="educationalBackground">Educational Background:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="educationalBackground"
                            name="educationalBackground"
                            value={education}
                            placeholder="Enter your educational background"
                            onChange={(e) => setEducation(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Upload ID File:</label>
                        <input type="file" onChange={handleIdFileChange} accept=".jpg, .jpeg, .png, .pdf" />
                    </div>
                    <div>
                        <label>Upload Degree File:</label>
                        <input type="file" onChange={handleDegreeFileChange} accept=".jpg, .jpeg, .png, .pdf" />
                    </div>
                    <div>
                        <label>Upload License File:</label>
                        <input type="file" onChange={handleLicenseFileChange} accept=".jpg, .jpeg, .png, .pdf"  />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit Request</button>
                    {error && <div className="error">{error}</div>}
                </form>
                
            </section>
        </>
    );
};

export default SubmitRequest;