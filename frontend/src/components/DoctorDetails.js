import React, { useState } from "react";
import axios from 'axios';
const DoctorDetails = ({ doctor }) => {
  console.log("doctor is ",doctor)
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

    try {
      const username = localStorage.getItem('username')

        const response = await axios.post('http://localhost:4000/api/patient/createAppointment', {
          username, appointmentDate: selectedAppointment.toString(), doctorUsername: doctor.username },
          );
        if (response.status === 201 || response.status === 404) {
            // Simulate adding appointment to the local state
            setLocalAppointments([...localAppointments, selectedAppointment]);

            // Remove the selected appointment from the doctor's available appointments
            const updatedAppointments = doctor.appointments.filter(appointment => appointment !== selectedAppointment);
            doctor.appointments = updatedAppointments;
            // Make a request to the backend to remove the appointment from the doctor's array

            // Reset error state
            setError('');
        } else {
            throw new Error('Failed to create appointment');
        }
    } catch (error) {
        console.error('Error creating appointment:', error);
        setError(`Failed to create appointment: ${error.message}`);

        // Check the status code and provide a more specific error message
        if (error.response && error.response.status === 400) {
            setError('Selected appointment date is not available');
        }
    }
};



const handleDropdownClick = (e) => {
  const selectedDate = e.target.value;
  setSelectedAppointment(selectedDate.toString());
  e.stopPropagation(); // Stop the event from propagating to the parent div
};
  return (
    <div className="doctor-details">
    <h4>{doctor.name}</h4>
    <button onClick={toggleDetails}>Show Details</button>
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
            {doctor.appointments && doctor.appointments.length > 0 ? (
              <div>
                <select onClick={handleDropdownClick}>
                  
                  <option value="" disabled>Select an appointment</option>
                  {doctor.appointments.map((appointment, index) => (
                    <option key={index} value={appointment.date}>
                      {/* {new Date(appointment).toLocaleString()} */
                      appointment.date}
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
export default DoctorDetails;
