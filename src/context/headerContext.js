import React, { createContext, useContext } from "react";
import { useLocation } from "react-router-dom";
export const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const location = useLocation();
  const headerHeight = 60; // or dynamic height
  const pathName = location.pathname;
  const isEmployer = pathName?.includes("employer");
  let getAuth = localStorage.getItem("auth");
  getAuth = getAuth && JSON.parse(getAuth);
  const isLoggedIn = getAuth && Object.keys(getAuth)?.length > 0;
  console.log("isLoggedIn", isLoggedIn);
  return (
    <HeaderContext.Provider
      value={{ headerHeight, isEmployer, isLoggedIn, getAuth }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

// Custom hook for accessing header context
export const useHeader = () => useContext(HeaderContext);
