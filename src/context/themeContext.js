import React, { createContext, useState, useEffect, useContext } from "react";

// Create a ThemeContext with default light mode
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // State to manage theme
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Effect to apply theme on body element and save it to localStorage
  useEffect(() => {
    document.body.className = theme; // Apply the theme to the body element
    document.main = theme;
    localStorage.setItem("theme", theme); // Save theme preference
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext);
