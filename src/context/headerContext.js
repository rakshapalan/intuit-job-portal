import React, { createContext, useContext } from "react";
import { useLocation } from "react-router-dom";
export const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const location = useLocation();
  const headerHeight = 60; // or dynamic height
  const pathName = location.pathname;
  const isEmployer = pathName?.includes("employer");

  return (
    <HeaderContext.Provider value={{ headerHeight, isEmployer }}>
      {children}
    </HeaderContext.Provider>
  );
};

// Custom hook for accessing header context
export const useHeader = () => useContext(HeaderContext);
