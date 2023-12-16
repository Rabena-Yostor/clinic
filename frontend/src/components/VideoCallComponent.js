import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
 
const VideoCallComponent = () => {
 
  const [callId, setCallId] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  let localStream = null;
  let peerConnection = null;

  // Function to start a video call
  const startCall = async () => {
    try {
      const response = await axios.post('/api/patient/startcall', {
        doctorId: 'your-doctor-id', // Replace with actual doctorId
        patientId: 'your-patient-id', // Replace with actual patientId
      });

      const { callId } = response.data;
      setCallId(callId);
      localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localVideoRef.current.srcObject = localStream;

      // Create peer connection and add tracks
      peerConnection = new RTCPeerConnection(/* configuration */);
      localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
      });

      // Set up event handlers for peer connection
      peerConnection.ontrack = event => {
        remoteVideoRef.current.srcObject = event.streams[0];
      };

      // TODO: Add event handlers for ICE candidates, etc.
    } catch (error) {
      console.error('Error starting the call:', error);
      // Handle error, show error message, etc.
    }
  };

  // Function to end a video call
  const endCall = async () => {
   
      await axios.post('/api/patient/endcall', { callId });

      if (peerConnection) {
        peerConnection.close();
        peerConnection = null;
      }
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        localStream = null;
      }

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = null;
      }
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null;
      }
      setCallId(null);
      
   
  };

  return (
    <div>
      <h1>Video Call Component</h1>
      <video ref={localVideoRef} autoPlay muted></video>
      <video ref={remoteVideoRef} autoPlay></video>
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