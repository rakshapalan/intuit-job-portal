import React from "react";
import "./index.css"; // Make sure to import the CSS

export const ShimmerTableRow = React.memo(() => {
  return (
    <div className="shimmer-row">
      <div className="shimmer shimmer-cell" style={{ width: "20%" }}></div>
      <div className="shimmer shimmer-cell" style={{ width: "30%" }}></div>
      <div className="shimmer shimmer-cell" style={{ width: "25%" }}></div>
      <div className="shimmer shimmer-cell" style={{ width: "25%" }}></div>
    </div>
  );
});
