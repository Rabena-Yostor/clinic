import React, { createContext, useReducer, useEffect } from 'react';

export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            };
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts]
            };
        default:
            return state;
    }
};

export const WorkoutsContextProvider = ({ children }) => {
    const initialState = {
        workouts: []
    };

    const [state, dispatch] = useReducer(workoutsReducer, initialState);

    useEffect(() => {
        // Simulate fetching data from an API
        const fetchData = async () => {
            try {
                // Fetch data from an API endpoint
                const response = await fetch('/api/workouts');
                const data = await response.json();

                // Dispatch action to set workouts in the state
                dispatch({ type: 'SET_WORKOUTS', payload: data });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call the fetchData function

        // Cleanup function (if needed)
        return () => {
            // Cleanup logic, if necessary
        };
    }, []); // Empty dependency array ensures the effect runs once after the initial render

    return (
        <WorkoutsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutsContext.Provider>
    );
};
