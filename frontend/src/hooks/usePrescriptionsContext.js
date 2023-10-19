import { PrescriptionsContext } from "../context/PrescriptionContext";
import { useContext } from "react";

export const usePrescriptionsContext = () => {  
    const context = useContext(PrescriptionsContext);

    if(!context){
        throw new Error('usePrescriptionsContext must be used within a PrescriptionsContextProvider');
    }

    return context;
}