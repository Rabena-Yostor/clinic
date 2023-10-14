import { useState } from "react";

const DoctorForm = () => {
    const [UserName,setUserName] = useState('')
    const [Name,setName] = useState('')
    const [Email,setEmail] = useState('')
    const [Password,setPassword] = useState('')
    const [DateOfBirth,setDateOfBirth] = useState('')
    const [HourlyRate,setHourlyRate] = useState('')
    const [AffiliatedHospital,setAffiliatedHospital] = useState('')
    const [Education,setEducation] = useState('')
    const [error,setError] = useState(null)


    const handleSubmit = async(e) => {
        e.preventDefault()
        const doctor = {UserName,Name,Email,Password,DateOfBirth,HourlyRate,AffiliatedHospital,Education}
        const response = await fetch('/api/workouts/doctor', {
            method: 'POST',
            body: JSON.stringify(doctor),
            headers: {
                'Content-Type': 'application/json'
            }
        })
         const json= await response.json()
        if(!response.ok){
            setError(json.error)
        }
        if (response.ok){
            setUserName('')
            setName('')
            setEmail('')
            setPassword('')
            setDateOfBirth('')
            setHourlyRate('')
            setAffiliatedHospital('')
            setEducation('')
            setError(null)
            console.log('doctor Created')
        }
    }
    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>Register Doctor</h3>

            <label> User Name</label>
            <input type="text"
             onChange={(e) => setUserName(e.target.value)}
                value={UserName}
            />  
            <label> Name</label>
            <input type="text"
             onChange={(e) => setName(e.target.value)}
                value={Name}
            />
            <label> Email</label>
            <input type="text"
             onChange={(e) => setEmail(e.target.value)}
                value={Email}
            />
            <label> Password</label>
            <input type="text"
             onChange={(e) => setPassword(e.target.value)}
                value={Password}
            />
            <label> Date Of Birth</label>
            <input type="date"
             onChange={(e) => setDateOfBirth(e.target.value)}
                value={DateOfBirth}
            />
            <label> Hourly Rate</label>
            <input type="number"
             onChange={(e) => setHourlyRate(e.target.value)}
                value={HourlyRate}
            />
            <label> Affiliated Hospital</label>
            <input type="text"
             onChange={(e) => setAffiliatedHospital(e.target.value)}
                value={AffiliatedHospital}
            />
            <label> Education</label>
            <input type="text"
             onChange={(e) => setEducation(e.target.value)}
                value={Education}
            />
            <button >Register Doctor </button>
            {error && <div className="error">{error}</div>}
            </form>
    )}
    export default DoctorForm