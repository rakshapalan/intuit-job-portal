// JobCard.js

import React from "react";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaTag,
  FaStar,
  FaRegEyeSlash,
} from "react-icons/fa"; // Icons for the job details
import "./index.css"; // Create a custom CSS file for styling

function JobCard({ job, handleApply, quickAppliedJobs }) {
  return (
    <div className="card job-card mb-3 shadow-sm">
      <div className="card-body">
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="card-title">{job.title}</h5>
            <div className="d-flex align-items-center">
              <div className="text-muted me-2">{job.companyName}</div>
              <div className="d-flex align-items-center">
                {/* Star Rating */}
                <FaStar className="icon star-icon" />
                <span className="rating-text me-2">
                  {job?.ambitionBoxData?.AggregateRating || "4.5"}
                </span>
                {/* User Reviews */}
                <span className="reviews-text">
                  (
                  {`${job?.ambitionBoxData?.ReviewsCount} reviews ` ||
                    "123 reviews"}
                  )
                </span>
              </div>
            </div>
          </div>
          <img
            src={job?.imgSrc || "https://img.naukri.com/logo_images/v3/717.gif"}
            loading="lazy"
            className="compImg"
            alt="Company Logo"
          />
        </div>

        {/* Job Details Section */}
        <div className="d-flex flex-wrap align-items-center mb-2">
          {/* Location */}
          <div className="d-flex align-items-center detail-item me-3">
            <FaMapMarkerAlt className="icon" />
            <span>
              {job?.placeholders?.find((p) => p.type === "location")?.label ||
                "Not Specified"}
            </span>
          </div>
          {/* Experience */}
          <div className="d-flex align-items-center detail-item me-3">
            <FaBriefcase className="icon" />
            <span>
              {job?.placeholders?.find((p) => p.type === "experience")?.label ||
                "Not Specified"}
            </span>
          </div>
          {/* Salary */}
          <div className="d-flex align-items-center detail-item me-3">
            <FaMoneyBillWave className="icon" />
            <span>
              {job?.placeholders?.find((p) => p.type === "salary")?.label ||
                "Not Specified"}
            </span>
          </div>
          {job?.minSalary && (
            <div className="d-flex align-items-center detail-item me-3">
              <FaMoneyBillWave className="icon" />
              <span>Minimum Salary($):</span>
              <span>{job?.minSalary}</span>
            </div>
          )}
          {/* Skills */}
          {job?.tagsAndSkills && (
            <div className="d-flex align-items-center detail-item">
              <FaTag className="icon" />
              <div
                className="d-inline-block text-wrap"
                style={{
                  maxWidth: "100%",
                  wordWrap: "break-word",
                  overflow: "hidden", // Hide overflowing text
                  textOverflow: "ellipsis", // Add ellipsis when the text overflows
                  whiteSpace: "nowrap", // Prevent the text from wrapping to the next line
                }}
              >
                {job.tagsAndSkills}
              </div>
            </div>
          )}
        </div>

        {/* Job Description Section */}
        <p className="card-text">{job.jobDescription}</p>

        {/* Quick Apply Checkbox */}
        <div className="form-check d-flex align-items-center mb-3">
          <input
            type="checkbox"
            dataTestId="quickApplycheckbox"
            className="form-check-input me-2"
            id={`quickApply-${job?.jobId}`}
            checked={quickAppliedJobs?.includes(job?.jobId)}
            onChange={() => handleApply(job)}
          />
          <label
            className="form-check-label"
            htmlFor={`quickApply-${job?.jobId}`}
          >
            Quick Apply
          </label>
        </div>

        {/* Footer Section */}
        <div className="d-flex justify-content-between align-items-center">
          {/* Hide Button */}
          <div className="d-flex align-items-center hide-tag">
            {/* <FaRegEyeSlash className="icon me-2" />
            <span>Hide</span> */}
          </div>
          {/* Days Ago Tag */}
          <div className="days-ago-tag">
            <span>4 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmployeeCard({ job, viewAllApplicants }) {
  return (
    <div className="card job-card mb-3 shadow-sm">
      <div className="card-body">
        <div>
          {/* Header Section */}
          <div className="d-flex justify-content-between align-items-center ">
            <h5 className="card-title mb-0">{job.title}</h5>
            <img
              className="compImg rounded-circle"
              src={
                job?.imgSrc || "https://img.naukri.com/logo_images/v3/717.gif"
              }
              loading="lazy"
              alt="Company Logo"
              style={{ width: "50px", height: "50px" }}
            />
          </div>
          <div className="d-flex align-items-center">
            <div className="text-muted me-2">{job.companyName}</div>
            <div className="d-flex align-items-center">
              {/* Star Rating */}
              <FaStar className="icon star-icon" />
              <span className="rating-text me-2">
                {job?.ambitionBoxData?.AggregateRating || "4.5"}
              </span>
              {/* User Reviews */}
              <span className="reviews-text">
                ({`${job?.ambitionBoxData?.ReviewsCount || "123"} reviews `})
              </span>
            </div>
          </div>

          {/* Job Description */}
          <p className="card-text d-flex align-items-center">
            {/* <i className="bi bi-list-task text-primary me-2"></i> */}
            <span>
              <strong>Job Requirements:</strong> {job.jobDescription}
            </span>
          </p>

          {/* Experience */}
          <p className="card-text d-flex align-items-center">
            {/* <i className="bi bi-briefcase-fill text-primary me-2"></i> */}
            <span>
              <strong>Experience:</strong> {job?.experience}
            </span>
          </p>

          {/* Job Type */}
          <p className="card-text d-flex align-items-center">
            {/* <i className="bi bi-clock text-primary me-2"></i> */}
            <span>
              <strong>Job Type:</strong> {job.jobType}
            </span>
          </p>

          {/* Skills */}
          <p className="card-text d-flex align-items-center">
            {/* <i className="bi bi-lightbulb text-primary me-2"></i> */}
            <span
              className="d-inline-block text-wrap"
              style={{ maxWidth: "100%" }}
            >
              <strong>Skills:</strong> {job.tagsAndSkills}
            </span>
          </p>

          {/* Applications and Button Aligned */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <p className="card-text mb-0 d-flex align-items-center">
              {/* <i className="bi bi-person-lines-fill text-primary me-2"></i> */}
              <span>
                <strong>Applications:</strong> {job.applications}
              </span>
            </p>
            <button
              className="btn btn-primary view"
              onClick={viewAllApplicants}
            >
              <i className="bi bi-people-fill me-2"></i>View all Applicants
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { JobCard, EmployeeCard };
