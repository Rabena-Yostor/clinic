import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const DoctorFollowUpRequests = () => {
    const doctorUsername = localStorage.getItem('username');
    const [followUpRequests, setFollowUpRequests] = useState([]);

    useEffect(() => {
        // Fetch follow-up requests when the component mounts
        fetchFollowUpRequests();
      }, []);
    
      const fetchFollowUpRequests = async () => {
        try {
          const response = await axios.get(`/api/doctors//doctorFollowUpRequests/${doctorUsername}`);
          setFollowUpRequests(response.data.followUpRequests);
        } catch (error) {
          console.error("Error fetching follow-up requests:", error);
        }
      };


    return (
        <div>
          <h2>Doctor Dashboard</h2>
          <h3>Doctor Username: {doctorUsername}</h3>

          <h3>Follow-up Requests</h3>
      <ul>
        {followUpRequests.map((request, index) => (
          <li key={index}>
            Patient: {request.username}, Date: {request.date}
          </li>
        ))}
      </ul>
        </div>
        
    );

}
export default DoctorFollowUpRequests;