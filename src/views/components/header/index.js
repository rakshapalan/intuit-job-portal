import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Logo from "../../../assets/logo.svg";
import { Button } from "react-bootstrap";
import { useAuth } from "../../../context/authContext";
import { useTheme } from "../../../context/themeContext";
import { header } from "../../../constants/base";

const Header = React.memo(() => {
  const navigate = useNavigate();
  const { headerHeight, isLoggedIn, auth, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  return (
    <header
      className="mainHeader"
      style={{
        height: `${headerHeight}px`,
      }}
    >
      <img
        onClick={() =>
          navigate(
            isLoggedIn
              ? auth?.role === "employer"
                ? "/employer/jobList"
                : "/user/jobList"
              : "/"
          )
        }
        src={Logo}
        alt="logo"
        style={{ width: "100px", height: "100px", cursor: "pointer" }}
      />
      <ul className="subDiv">
        {header &&
          header?.map((item, index) => (
            <li key={index} className="tabSection">
              {item}
            </li>
          ))}
      </ul>
      {/* Theme Toggle Switch using Bootstrap */}
      {isLoggedIn && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "440px",
            transform: "translateY(-50%)", // Center vertically
          }}
        >
          <label className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <span className="form-check-label">
              {theme === "light"
                ? "Switch to Dark Mode"
                : "Switch to Light Mode"}
            </span>
          </label>
        </div>
      )}

      {/* //to show once we have the login token */}
      {isLoggedIn && (
        <Button
          variant="primary"
          type="submit"
          className="py-1"
          style={{
            backgroundColor: "#007bff",
            borderColor: "#007bff",
            borderRadius: "25px",
            position: "absolute",
            right: "30px",
          }}
          onClick={logout}
        >
          Log Out
        </Button>
      )}
    </header>
  );
});

export default Header;
