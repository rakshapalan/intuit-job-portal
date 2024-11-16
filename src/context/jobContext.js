// src/contexts/JobContext.js
import React, { createContext, useReducer } from "react";
import { jobReducer, initialState } from "../reducers/reducer";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobReducer, initialState);

  return (
    <JobContext.Provider value={{ state, dispatch }}>
      {children}
    </JobContext.Provider>
  );
};
