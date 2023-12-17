import { useEffect, useState } from "react"
import PatientDetails from '../components/PatientDetails'
import PatientForm from '../components/PatientFrom'
import { usePatientsContext } from "../hooks/usePatientsContext"
//import WalletInfo from '../components/WalletInfo';

const HomePatients = () => {
  const { patients, dispatch } = usePatientsContext()
  const [searchTerm, setSearchTerm] = useState("");
  const [showOnlyUpcoming, setShowOnlyUpcoming] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null); 
  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch('/api/patient/getAllPatients')
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_PATIENTS', payload: json })

      }
    }

    fetchPatients()
  }, [])

  return (
    <div className="home">

      <div className="workouts">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by patient name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
        {patients &&
          patients
            .filter((patient) =>
              patient.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .filter((patient) =>
              showOnlyUpcoming ? patient.Appointment_Status === "upcoming" : true
            )
            .map((patient) => (
              <div
                className={`workout-details ${selectedPatient === patient ? 'selected' : ''}`}
                key={patient._id}
                onClick={() => setSelectedPatient(patient)}
              >
                <PatientDetails patient={patient} />
              </div>
            ))}
      </div>
      <div className="filter-controls">
        <button onClick={() => setShowOnlyUpcoming(!showOnlyUpcoming)}>
          {showOnlyUpcoming
            ? "Show All Patients"
            : "Show Upcoming Appointments Only"}
        </button>
      </div>
     
      
     
    </div>
  );

}

export default HomePatients