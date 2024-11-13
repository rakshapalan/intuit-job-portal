import React from "react";

import "./index.css";
import Logo from "../../../assets/logo.svg";
import { useHeader } from "../../context/headerContext";

const Header = React.memo(() => {
  const { headerHeight } = useHeader();
  const header = ["Jobs", "Services", "Companies"];
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: `${headerHeight}px`,
        backgroundColor: "#333",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        zIndex: 1000,
        marginBottom: "20px",
      }}
    >
      <img src={Logo} />
      <ul>
        {header &&
          header.map((item, index) => (
            <li key={index} className="tabSection">
              {item}
            </li>
          ))}
      </ul>
    </header>
  );
});

export default Header;
