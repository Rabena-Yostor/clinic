import React, { useState } from 'react';
import axios from 'axios';
 
const VideoCallComponent = () => {
  const [callId, setCallId] = useState(null);

  // Function to start a video call
  const startCall = async () => {
    try {
      const response = await axios.post('/api/patient/startcall', {
        doctorId: 'your-doctor-id', // Replace with actual doctorId
        patientId: 'your-patient-id', // Replace with actual patientId
      });

      const { callId } = response.data;
      setCallId(callId);
    } catch (error) {
      console.error('Error starting the call:', error);
      // Handle error, show error message, etc.
    }
  };

  // Function to end a video call
  const endCall = async () => {
    try {
      await axios.post('/api/patient/endcall', { callId });

      // Clear the callId in the component state
      setCallId(null);
    } catch (error) {
      console.error('Error ending the call:', error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div>
      <h1>Video Call Component</h1>
      {callId ? (
        <div>
          <p>Call ID: {callId}</p>
          <button onClick={endCall}>End Call</button>
        </div>
      ) : (
        <button onClick={startCall}>Start Call</button>
      )}
    </div>
  );
};

export default VideoCallComponent;