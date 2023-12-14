import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const DoctorFollowUpRequests = () => {
    const doctorUsername = localStorage.getItem('username');
    const [followUpRequests, setFollowUpRequests] = useState([]);
    const [requests, setRequests] = useState(null);

    useEffect(() => {
        // Fetch follow-up requests when the component mounts
        fetchFollowUpRequests();
      }, []);

      const fetchFollowUpRequests = async () => {
        try {
            //error here
          const response = await axios.get(`api/doctors/doctorFollowUpRequests/${doctorUsername}`);
          console.log("Follow-up requests:", response.data);
          setFollowUpRequests(response.data);
        } catch (error) {
          console.error("Error fetching follow-up requests:", error);
        }
      };
    
      
      const handleAccept = async (requestId,username) => {
        fetch(`/api/doctors/acceptFollowUpRequest/${requestId}/${username}`, {
            method: 'POST'
        }).then(response => {
            console.log(response.status)
            if (response.status === 200) {
                // If the request was successful, update the state to remove the accepted request
                fetchFollowUpRequests();
            }
        });
    };
    
    const handleReject = (requestId) => {
        // Make a DELETE request to remove the document from the database
        fetch(`/api/doctors/rejectfollowUpRequest/${requestId}`, {
            method: 'DELETE'
        })
        .then(response => {
            console.log(response.status)
            if (response.status === 200) {
                // If the request was successful, update the state to remove the rejected request
                fetchFollowUpRequests();
            }
        });
    };


    return (
        <div>
          <h2>Doctor Dashboard</h2>
          <h3>Doctor Username: {doctorUsername}</h3>

          <h3>Follow-up Requests</h3>
      <ul>
        {followUpRequests && followUpRequests.map((request) => (
          <div key={request._id}>
            <p>Patient: {request.username}, Date: {request.date} </p>
            <button onClick={() => handleAccept(request._id,request.username)}>Accept</button>
            <button onClick={() => handleReject(request._id)}>Reject</button>
          </div>
        ))}
      </ul>
        </div>
        
    );

}
export default DoctorFollowUpRequests;