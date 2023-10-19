import{useEffect,useState} from 'react'
//import { json } from 'react-router-dom'
//components
//import WorkoutDetails from '../components/WorkoutDetails'

import FamilyForm from '../components/FamilyForm'

const Addfamily = () => {
    const [family, setFamily] = useState(null)

useEffect(() => {
    const fetchFamily = async () => {
        const response = await fetch('/api/patient/addFamilyMember')
        const json = await response.json()
        if(response.ok){
            setFamily(json)
        }
    }



    fetchFamily()
},[])
   //CREATE a homepage that choose to go to any page
return (
    <div className="home">
        <FamilyForm/>
    </div> 
)

}
export default Addfamily