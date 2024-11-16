import React from "react";
import { Link } from "react-router-dom";

const NotFound = React.memo(() => (
  <div style={{ textAlign: "center", marginTop: "50px" }}>
    <img
      src="https://static.instahyre.com/images/errors/404.svg"
      alt="notfound"
    />
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for does not exist.</p>
    <Link to="/">Go back to Home</Link>
  </div>
));

export default NotFound;
