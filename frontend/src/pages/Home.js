import { useEffect, useState } from "react"
import workdetails from '../components/workdetails'
const Home= ()=> {

    const [workouts, updatework]= useState(null)
    useEffect(()=> {
        const fetchWorkouts= async ()=>{
            const response= await fetch('/api/workouts')
 
            const json= await response.json()

            if (response.ok){
                updatework(json)

            }
        }

        fetchWorkouts()
    }, [])
    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((work)=>(
                   < workdetails key={work._id} work={work}/>

                ))}
            </div>

            
        </div>
    )
}
export default Home 