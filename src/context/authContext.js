import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { users, ROLES, headerHeight } from "../constants/base";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();
  const storedAuth = localStorage.getItem("auth");
  const location = useLocation();
  useEffect(() => {
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, [storedAuth]);

  const login = (username, password, role) => {
    const user = users.find(
      (user) =>
        user.username === username &&
        user.password === password &&
        user.role === role
    );

    if (user) {
      setAuth(user);
      localStorage.setItem("auth", JSON.stringify(user));
      navigate(role === ROLES.EMPLOYER ? "/employer/jobList" : "/user/jobList");
      toast.success("Login successfull", {
        position: "bottom-right",
        autoClose: 1000,
      });
    } else {
      toast.error("Invalid username or password for this role", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
    navigate("/"); // Redirect to default login after logout
  };

  const pathName = location.pathname;
  const isEmployer = pathName?.includes("employer");
  // let getAuth = localStorage.getItem("auth");
  // getAuth = getAuth && JSON.parse(getAuth);
  const isLoggedIn = auth && Object.keys(auth)?.length > 0;

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        logout,
        isLoggedIn,
        isEmployer,
        headerHeight,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const ROLES_CONSTANTS = ROLES;
