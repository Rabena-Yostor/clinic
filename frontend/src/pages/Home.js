import { useEffect } from "react"

import PatientDetails from '../components/PatientDetails'
import PatientForm from '../components/PatientFrom'
import { usePatientsContext } from "../hooks/usePatientsContext"

const Home = () => {
  const { patients, dispatch } = usePatientsContext()
  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch('/api/workouts')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_PATIENTS', payload: json})

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