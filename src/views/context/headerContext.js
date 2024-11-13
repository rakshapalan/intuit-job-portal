import React, { createContext, useContext } from "react";

export const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const headerHeight = 60; // or dynamic height

  return (
    <HeaderContext.Provider value={{ headerHeight }}>
      {children}
    </HeaderContext.Provider>
  );
};

// Custom hook for accessing header context
export const useHeader = () => useContext(HeaderContext);
