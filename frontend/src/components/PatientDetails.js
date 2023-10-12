const PatientDetails = ({ patient }) => {

    return (
      <div className="workout-details">
        <h4>{patient.username}</h4>
        <p><strong>Email: </strong>{patient.email}</p>
        <p><strong>Date Of Birth: </strong>{patient.dateOfBirth}</p>
        <p><strong>Gender: </strong>{patient.gender}</p>
        <p><strong>Mobile Number: </strong>{patient.mobileNumber}</p>
        <p><strong>Emergency Contact Name: </strong>{patient.EmergencyContactName}</p>
        <p><strong>Emergency Contact Number: </strong>{patient.EmergencyContactNo}</p>
        <p><strong>Appointment Date: </strong>{patient.Appointment}</p>
        <p><strong>Appointment Status: </strong>{patient.Appointment_Status}</p>
        <p>{patient.createdAt}</p>
      </div>
    )
  }
  
  export default PatientDetails