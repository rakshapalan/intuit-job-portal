import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Logo from "../../../assets/logo.svg";
import { useHeader } from "../../../context/headerContext";
import { Button } from "react-bootstrap";

const Header = React.memo(() => {
  const navigate = useNavigate();
  const { headerHeight } = useHeader();
  const header = ["Jobs", "Services", "Companies"];
  return (
    <header
      className="mainHeader"
      style={{
        height: `${headerHeight}px`,
      }}
    >
      <img
        onClick={() => navigate("/")}
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
      {/* //to show once we have the login token */}
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
        onClick={() => navigate("/")}
      >
        Log Out
      </Button>
    </header>
  );
});

export default Header;
