import { useEffect, useState} from "react";

import DoctorForm from "../components/DoctorForm";

const AddDoctor = () => {
    const [doctor, setDoctor] = useState(null)

    useEffect(() => {
        const fetchDoctor= async () => {
            const response = await fetch('/api/workouts/doctor')
            const json = await response.json()
            if(response.ok){
                setDoctor(json)
            }
        }
        fetchDoctor()
    },[])

    return (
        <div className="home">
            <DoctorForm/>
        </div>
    )
}

export default AddDoctor