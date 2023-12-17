import { useState } from "react"
import { usePatientsContext } from "../hooks/usePatientsContext"

const PatientForm = () => {
    const {dispatch} = usePatientsContext()
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const [dateOfBirth, setDOB] = useState('')
    const [gender, setGender] = useState('')
    const [mobileNumber, setMobileNo] = useState('')
    const [EmergencyContactName, setECName] = useState('')
    const [EmergencyContactNo, setECNo] = useState('')
    const [Appointment, setAppointment] = useState('')
    const [Appointment_Status, setApStatus] = useState('')
    const [error, setError] = useState(null)

    
    const handleSubmit = async (e) => {
        e.preventDefault()
       
        const patient = {username, name, email, password, dateOfBirth, gender, mobileNumber, EmergencyContactName, EmergencyContactNo, Appointment, Appointment_Status}
        
        const response = await fetch('/api/patient/signup', {
          method: 'POST',
          body: JSON.stringify(patient),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const json = await response.json()
    
        if (!response.ok) {
          setError(json.error)
        }
        if (response.ok) {
          setError(null)
          setName('')
          setUsername('')
          setEmail('')
          setPass('')
          setGender('')
          setMobileNo('')
          setDOB('')
          setECName('')
          setECNo('')
          setAppointment('')
          setApStatus('')
          console.log('new workout added:', json)
          dispatch({type: 'CREATE_PATIENT', payload: json})

        }
    
      }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Patient</h3>

            <label>Name:</label>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />

            <label>Username:</label>
            <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />

            <label>Email:</label>
            <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>Phone Number:</label>
            <input
                type="text"
                onChange={(e) => setMobileNo(e.target.value)}
                value={mobileNumber}
            />
            <label>Date of Birth:</label>
            <input
                type="date"
                onChange={(e) => setDOB(e.target.value)}
                value={dateOfBirth}
            />
            <label>Gender:</label>
            <input
                type="text"
                onChange={(e) => setGender(e.target.value)}
                value={gender}
            />
            <label>Password:</label>
            <input
                type="text"
                onChange={(e) => setPass(e.target.value)}
                value={password}
            />
            <label>Emergency Contact Name:</label>
            <input
                type="text"
                onChange={(e) => setECName(e.target.value)}
                value={EmergencyContactName}
            />
            <label>Emergency Contact Number:</label>
            <input
                type="text"
                onChange={(e) => setECNo(e.target.value)}
                value={EmergencyContactNo}
            />
            <label>Appointment Date:</label>
            <input
                type="date"
                onChange={(e) => setAppointment(e.target.value)}
                value={Appointment}
            />
            <label>Appointment_Status:</label>
            <input
                type="text"
                onChange={(e) => setApStatus(e.target.value)}
                value={Appointment_Status}
            />
            <button>Add New Patient</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}
export default PatientForm