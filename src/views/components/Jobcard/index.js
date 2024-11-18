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
          <div className="d-flex align-items-center detail-item">
            <FaMapMarkerAlt className="icon" />
            <span>
              {job?.placeholders?.find((p) => p.type === "location")?.label ||
                "Not Specified"}
            </span>
          </div>
          {/* Experience */}
          <div className="d-flex align-items-center detail-item">
            <FaBriefcase className="icon" />
            <span>
              {job?.placeholders?.find((p) => p.type === "experience")?.label ||
                "Not Specified"}
            </span>
          </div>
          {/* Salary */}
          <div className="d-flex align-items-center detail-item">
            <FaMoneyBillWave className="icon" />
            <span>
              {job?.placeholders?.find((p) => p.type === "salary")?.label ||
                "Not Specified"}
            </span>
          </div>
          {/* Skills */}
          {job?.tagsAndSkills && (
            <div className="d-flex align-items-center detail-item">
              <FaTag className="icon" />
              <span>{job.tagsAndSkills}</span>
            </div>
          )}
        </div>

        {/* Job Description Section */}
        <p className="card-text">{job.jobDescription}</p>

        {/* Quick Apply Checkbox */}
        <div className="form-check d-flex align-items-center mb-3">
          <input
            type="checkbox"
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
            <FaRegEyeSlash className="icon me-2" />
            <span>Hide</span>
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

// function JobCard({ job, quickApply }) {
//   return (
//     <div className="job-card">
//       <div className="heading">{job.title}</div>
//       <p>
//         <div className="sub-heading">Location:</div>{" "}
//         {job?.placeholders?.find((p) => p.type === "location").label}
//       </p>
//       <p>
//         <strong>Experience:</strong>{" "}
//         <div className="sub-heading">Experience:</div>
//         {job?.placeholders?.find((p) => p.type === "experience").label}
//       </p>
//       <p>
//         <div className="sub-heading">Experience:</div>
//         {job?.placeholders?.find((p) => p.type === "salary").label}
//       </p>
//       <p>
//         <div className="sub-heading">Skills:</div>
//         <div>{job?.tagsAndSkills}</div>
//       </p>
//       <p>
//         <div className="sub-heading">Company Rating:</div>
//         {job?.ambitionBoxData?.AggregateRating} (
//         {job?.ambitionBoxData?.ReviewsCount} reviews)
//       </p>
//       <p>
//         <div className="sub-heading">Minimum Salary(₹):{job?.minSalary}</div>
//       </p>
//       {/* <a href={job?.jdURL}>View Job Details</a> */}
//       <p>
//         <button
//           type="submit"
//           className="btn btn-primary"
//           onClick={() => quickApply(job?.jobId)}
//         >
//           Quick-Apply
//         </button>
//       </p>
//     </div>
//   );
// }
function EmployeeCard({ job, viewAllApplicants }) {
  return (
    <div className="card job-card mb-3 shadow-sm">
      <div className="card-body">
        <div>
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{job.title}</h5>

            <img
              className="compImg"
              src={
                job?.imgSrc || "https://img.naukri.com/logo_images/v3/717.gif"
              }
              loading="lazy"
              alt="Lazy-loaded image"
            ></img>
          </div>
          <h6 className="card-subtitle mb-2 ">{job?.companyName}</h6>
          <p className="card-text">
            <span className="text-muted">Job Requirements: </span>
            {job.jobDescription}
          </p>
          <p className="card-text">
            <span className="text-muted">Experience: </span>
            {job?.experience}
          </p>
          <p className="card-text">
            <span className="text-muted">Job Type: </span>
            {job.jobType}
          </p>
          <p className="card-text">
            <span className="text-muted">Skills: </span>
            {job.tagsAndSkills}
          </p>
          <p className="card-text">
            <span className="text-muted">Number of Applications: </span>
            {job.applications}
          </p>

          <button className="btn btn-primary view" onClick={viewAllApplicants}>
            View all Applicants
          </button>
        </div>
      </div>
    </div>
  );
}

export { JobCard, EmployeeCard };
