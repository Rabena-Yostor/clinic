import React, { useState } from "react";
import axios from 'axios';

const DoctorDetails = ({ doctor }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState("");
  const [localAppointments, setLocalAppointments] = useState([]);
  const [error, setError] = useState("");

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };






  
  
  const simulateCreateAppointment = async () => {
    if (!selectedAppointment) {
        console.error('Selected appointment date is empty or invalid');
        setError('Selected appointment date is required');

        return;
    }

    console.log('Selected Appointment Date:', selectedAppointment);

    try {
        const response = await axios.post('http://localhost:4000/api/patient/createAppointment', {
            patientId: '652edc050faefd92d6187db0',
            appointmentDate: selectedAppointment,
            
        });

        if (response.status === 201 || response.status === 404) {
            // Simulate adding appointment to the local state
            setLocalAppointments([...localAppointments, selectedAppointment]);
             // Remove the selected appointment from the doctor's available appointments
             const updatedAppointments = doctor.Appointments.filter(appointment => appointment !== selectedAppointment);
             doctor.Appointments = updatedAppointments;
 
             // Make a request to the backend to remove the appointment from the doctor's array
            await axios.delete(`http://localhost:4000/api/doctor/removeAppointment/${doctor._id}/${selectedAppointment}`);

            // Reset error state
            setError('');


        } else {
            throw new Error('Failed to create appointment');
        }
    } catch (error) {
      console.error('Error creating appointment:', error);

      // Check the status code and provide a more specific error message
      if (error.response && error.response.status === 400) {
          setError('Selected appointment date is not available');
      } 
  }
};
  



const handleDropdownClick = (e) => {
  const selectedDate = e.target.value;
  setSelectedAppointment(selectedDate);
  e.stopPropagation(); // Stop the event from propagating to the parent div
};

  return (
    <div className="doctor-details" onClick={toggleDetails}>
      <h4>{doctor.name}</h4>
      {showDetails && (
        <div>
          <p>
            <strong>Username:</strong> {doctor.username}
          </p>
          <p>
            <strong>Email:</strong> {doctor.email}
          </p>
          <p>
            <strong>Date of Birth:</strong> {doctor.dateOfBirth}
          </p>
          <p>
            <strong>Hourly Rate:</strong> {doctor.hourlyRate}
          </p>
          <p>
            <strong>Affiliation:</strong> {doctor.affiliation}
          </p>
          <p>
            <strong>Speciality:</strong> {doctor.speciality}
          </p>
          <p>
            <strong>Educational Background:</strong>
            {doctor.educationalBackground}
          </p>
          <p>
            <strong>Available Appointments:</strong>{" "}
            {doctor.Appointments && doctor.Appointments.length > 0 ? (
              <div>
                <select onClick={handleDropdownClick}>
                  
                  <option value="" disabled>Select an appointment</option>
                  {doctor.Appointments.map((appointment, index) => (
                    <option key={index} value={appointment}>
                      {new Date(appointment).toLocaleString()}
                    </option>
                  ))}
                  
                </select>
               
                <button onClick={simulateCreateAppointment}>
                  Create Appointment
                </button>
                
                {error && <p style={{ color: 'red' }}>{error}</p>}
              </div>
            ) : (
              "No available appointments"
            )}
          </p>
          <p>
            <strong>Session Price:</strong>
            {doctor.hourlyRate +
              0.1 * doctor.hourlyRate -
              0.4 * (doctor.hourlyRate + 0.1 * doctor.hourlyRate)}
          </p>
        </div>
      )}
    </div>
  );
};

export default DoctorDetails;
