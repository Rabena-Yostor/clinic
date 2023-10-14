
import { useEffect ,useState } from "react"



const Home = ()=>{

    useEffect(() =>{
        const filterapp = async()=> {
            const response=await fetch('http://localhost:9000/appt/filter/doctor')
            const json = await response.json()
            
        }
        filterapp()

    },[] )
    return(
        <div className="home">
            <div className="clinic">

            </div>
           
        </div>
    )
}
export default Home;