import React, { useCallback } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { EmployeeTxt, EmployerTxt } from "../../../constants/base";
import { useAuth } from "../../../context/authContext";

const Subheader = ({
  name,
  navigateTab,
  secondaryText,
  secondaryFunc,
  quickAppliedJobs,
}) => {
  const { isEmployer } = useAuth();
  const navigate = useNavigate();
  const postJob = useCallback(() => {
    navigate(navigateTab);
  }, [navigate]);

  return (
    <div className="banner">
      <div className="subHeader d-flex justify-content-center pe-3 py-5">
        <div className="flex flex-column ">
          <div className="flex flex-column align-items-center">
            <div style={{ fontSize: "24px", fontWeight: 600 }}>
              {" "}
              {isEmployer ? EmployerTxt?.mainTxt : EmployeeTxt?.mainTxt}
            </div>
            <div className="subText">
              {isEmployer ? EmployerTxt?.subTxt : EmployeeTxt?.subTxt}
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
        {secondaryText && (
          <button
            type="submit"
            className="btn btn-primary secondaryBtn"
            onClick={secondaryFunc}
            disabled={quickAppliedJobs?.length === 0}
          >
            {`${secondaryText} ${
              quickAppliedJobs.length > 0 ? quickAppliedJobs.length : ""
            } ${quickAppliedJobs.length > 1 ? "Jobs" : "Job"}`}
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
    </div>
  );
};

export default Subheader;
