import React, { useState, useEffect } from 'react';

const LinkForm = () => {
    const [username, setUsername] = useState('');
    const [familyMemberContact, setFamilyMemberContact] = useState('');
    const [relation, setRelation] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Retrieve the username from local storage
        const loggedInUsername = localStorage.getItem('username');
        if (loggedInUsername) {
            setUsername(loggedInUsername);
        } else {
            console.log('No username found in local storage');
            // You might want to handle this case, perhaps by redirecting to the login page
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/patient/linkFamilyMember', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, familyMemberContact, relation })
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Family member linked successfully!');
            } else {
                setMessage(`Error: ${data.error || 'Failed to link family member'}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message || 'Failed to link family member'}`);
        }
    };

    return (
        <div>
            <h2>Link Family Member</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Family Member Contact:
                        <input 
                            type="text" 
                            value={familyMemberContact} 
                            onChange={(e) => setFamilyMemberContact(e.target.value)} 
                            placeholder="Family Member Contact" 
                            required 
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Relation:
                        <select 
                            value={relation} 
                            onChange={(e) => setRelation(e.target.value)} 
                            required
                        >
                            <option value="">Select Relation</option>
                            <option value="WIFE">Wife</option>
                            <option value="HUSBAND">Husband</option>
                            <option value="CHILDREN">Children</option>
                        </select>
                    </label>
                </div>
                <button type="submit">Link Family Member</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default LinkForm;
