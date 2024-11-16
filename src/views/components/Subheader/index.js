import React, { useCallback } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const Subheader = ({
  name,
  navigateTab,
  secondaryText,
  secondaryFunc,
  quickAppliedJobs,
}) => {
  const navigate = useNavigate();
  const postJob = useCallback(() => {
    navigate(navigateTab);
  }, [navigate]);
  return (
    <div className="position-relative">
      <div className="subHeader d-flex justify-content-center pe-3 py-5">
        <div className="flex flex-column ">
          <div className="flex flex-column align-items-center">
            <div style={{ fontSize: "24px", fontWeight: 600 }}>Search jobs</div>
            <div className="subText">
              Want to level up your career? View the best jobs and apply to top
              companies in one click, only on Intuit! 🚀
            </div>
          </div>
        </div>
      </div>

      {secondaryText && (
        <button
          type="submit"
          className="btn btn-primary secondaryBtn"
          onClick={secondaryFunc}
          disabled={quickAppliedJobs?.length === 0}
        >
          {`${secondaryText} ${
            quickAppliedJobs.length > 0 ? quickAppliedJobs.length : ""
          } ${quickAppliedJobs.length > 0 ? "Jobs" : "Job"}`}
        </button>
      )}
      {name && (
        <button
          type="submit"
          className="btn btn-primary submitBtn"
          onClick={postJob}
        >
          {name}
        </button>
      )}
    </div>
  );
};

export default Subheader;
