import { createContext, useReducer } from 'react'

export const PrescriptionsContext = createContext();


export const prescriptionsReducer = (state, action) => {
    switch(action.type) {
        case 'CREATE_PRESCRIPTIONS':
            return {
                prescriptions: [action.payload, ...state.prescriptions]
            }
        case 'SET_PRESCRIPTION':
            return {
                prescriptions: action.payload
            }
        case 'REMOVE_PRESCRIPTION':
            return {
                ...state,
                prescriptions: state.prescriptions.filter(prescription => prescription._id !== action.payload)
            }
        case 'UPDATE_PRESCRIPTION':
            const updatedPrescription = action.payload;

            const updatedPrescriptions = state.prescriptions.map(prescription => {
                if(prescription._id === updatedPrescription._id) {
                    return updatedPrescription;
                }
                return prescription;
            })
            return {
                ...state,
                prescriptions: updatedPrescriptions
            }
        default:
            return state;
    }   
}

export const PrescriptionsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(prescriptionsReducer,{
        prescriptions: null
    });





    return (
        <PrescriptionsContext.Provider value ={{...state,dispatch}}>
            {children}
        </PrescriptionsContext.Provider>
    )

}