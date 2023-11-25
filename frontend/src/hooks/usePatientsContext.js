import { PatientsContext } from "../context/PatientContext";
import { useContext } from "react";

export const usePatientsContext = () =>{
    const context = useContext(PatientsContext)
    
    if(!context){
        throw Error('useContext Error')
    }
    
    return context
}