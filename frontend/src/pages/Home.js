import { useEffect, useState } from "react"

import PatientDetails from '../components/PatientDetails'
import PatientForm from '../components/PatientFrom'

const Home = () => {
  const [patients, setPatients] = useState(null)

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch('/api/workouts')
      const json = await response.json()

      if (response.ok) {
        setPatients(json)
      }
    }

    fetchPatients()
  }, [])

  return (
    <div className="home">
      <div className="workouts">
        {patients && patients.map(patient => (
          <PatientDetails patient={patient} key={patient._id} />
          ))}
      </div>
      <PatientForm />
    </div>
  )
}

export default Home