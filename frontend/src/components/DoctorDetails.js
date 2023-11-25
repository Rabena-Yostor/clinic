import React, { useState } from "react";

const DoctorDetails = ({ doctor }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
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
            <strong>Available Appointment:</strong>
            {doctor.availableAppointment}
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
