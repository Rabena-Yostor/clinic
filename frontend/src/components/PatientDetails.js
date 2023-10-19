import { usePatientsContext } from "../hooks/usePatientsContext"
const PatientDetails = ({ patient }) => {
  const {dispatch} = usePatientsContext()
  
  const handleClick= async () => {
    const response = await fetch('/api/workouts/'+ patient._id , {
      method:'DELETE'
    })
    const json =  await response.json()

    if(response.ok){
      console.log('Response is ok')
      dispatch({type: 'DELETE_PATIENT', payload: json})

    }
    
  }
    return (
      <div className="workout-details">
        <h4>{patient.name}</h4>
        <p><strong>Email: </strong>{patient.email}</p>
        <p><strong>Date Of Birth: </strong>{patient.dateOfBirth}</p>
        <p><strong>Gender: </strong>{patient.gender}</p>
        <p><strong>Mobile Number: </strong>{patient.mobileNumber}</p>
        <p><strong>Emergency Contact Name: </strong>{patient.EmergencyContactName}</p>
        <p><strong>Emergency Contact Number: </strong>{patient.EmergencyContactNo}</p>
        <p><strong>Appointment Date: </strong>{patient.Appointment}</p>
        <p><strong>Appointment Status: </strong>{patient.Appointment_Status}</p>
        <p>{patient.createdAt}</p>
        <span onClick={handleClick}>delete</span>
      </div>
    )
  }
  
  export default PatientDetails