import{useEffect,useState} from 'react'
//import { json } from 'react-router-dom'
//components
//import WorkoutDetails from '../components/WorkoutDetails'

import LinkForm from '../components/LinkForm'

const Linkfamily = () => {
    const [family, setFamily] = useState(null)

useEffect(() => {
    const fetchFamily = async () => {
        const response = await fetch('/api/patient/linkFamilyMember')
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
        <LinkForm/>
    </div> 
)

}
export default Linkfamily