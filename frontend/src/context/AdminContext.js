import React, { createContext, useContext, useReducer } from 'react';

const AdminContext = createContext();

const initialState = {
  requests: [],
};

const adminReducer = (state, action) => {
  switch (action.type) {
    case 'SET_REQUESTS':
      return { ...state, requests: action.payload };
    default:
      return state;
  }
};

export const AdminContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  return (
    <AdminContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  return useContext(AdminContext);
};
