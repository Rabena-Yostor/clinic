import React, { useState,useEffect } from 'react';

const PatientDocuments= () =>{
    const [medicalHistoryFile, setMedicalHistoryFile] = useState(null);
    const [medicalHistoryFiles, setMedicalHistoryFiles] = useState([]);
    const [error, setError] = useState(null);
    const [selectedDocument, setSelectedDocument] = useState(null);
    useEffect(() => {
        fetchMedicalHistoryFiles();
    }, []);
    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('medicalHistoryFile', medicalHistoryFile);
        const username = localStorage.getItem('username')
        try {
            const response = await fetch(`http://localhost:4000/api/patient/uploadDocument/${username}`, {
                method: 'POST',
                body: formData,
            });
    
            const data = await response
    
            if (response.ok) {
                console.log('success:', data);
                setMedicalHistoryFile(null);
            } else {
                console.error('failed:', data.error);
                // Handle registration request failure, e.g., display an error message to the user
            }
        } catch (error) {
            console.error('Error during registration request:', error);
            // Handle network or other errors during registration request
        }
    };
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setMedicalHistoryFile(file);
    };
    const fetchMedicalHistoryFiles = async () => {
        const username = localStorage.getItem('username')
        try {
            // Fetch the list of medical history files for the logged-in patient
            const response = await fetch(`http://localhost:4000/api/patient/medicalHistoryFiles/${username}`, {
                method: 'GET'
            });

            const data = await response.json();

            if (response.ok) {
                setMedicalHistoryFiles(data);
            } else {
                setError(data.error);
            }
        } catch (error) {
            console.error('Error fetching medical history files:', error);
            setError('Error fetching medical history files');
        }
    };
    const handleRemove = async (e) => {
        try {
            const username = localStorage.getItem('username')
            // Remove the selected document for the logged-in patient
            console.log(selectedDocument)
            console.log("start")
            // const selectedOption = e.target.options[e.target.selectedIndex];
            // console.log(selectedOption);
            // const validDocumentId = String(selectedOption.value);
            // console.log(validDocumentId);
            const response = await fetch(`http://localhost:4000/api/patient/removeDocument/${username}/${selectedDocument}`, {
                method: 'DELETE',
            });
            console.log(response);
            const data = await response.json();

            if (response.ok) {
                console.log('Document removed successfully:', data);
                fetchMedicalHistoryFiles();
            } else {
                setError(data.error);
            }
        } catch (error) {
            console.error('Error removing document:', error);
            setError('Error removing document');
        }
    };

    return (
        <div>
            <h1>Document Management</h1>
            <div>
                <label>Upload Document:</label>
                <input type="file" onChange={handleFileChange} accept=".png, .jpeg, .jpg, .pdf" />
                <button onClick={handleUpload}>Upload</button>
            </div>
            <div>
                    <label>Remove Document:</label>
                    <select onChange={(e) => setSelectedDocument(e.target.value)}>
                        <option value="" disabled selected>
                            Select a document
                        </option>
                        {medicalHistoryFiles.map((file) => (
                            <option key={file._id} value={file._id}>
                                {file._id}
                            </option>
                        ))}
                    </select>
                    <button onClick={(e) => handleRemove(e)} disabled={!selectedDocument}>
                        Remove
                    </button>
                </div>
        </div>
    );
};

export default PatientDocuments;