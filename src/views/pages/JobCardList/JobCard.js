// JobCard.js

import React, { useState } from "react";

function JobCard({ job, handleApply, quickAppliedJobs }) {
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
              alt="Company Logo"
            />
          </div>
          <h6 className="card-subtitle mb-2 ">{job?.companyName}</h6>
          <p className="card-text">
            <span className="text-muted">Location: </span>
            {job?.placeholders?.find((p) => p.type === "location")?.label}
          </p>
          <p className="card-text">
            <span className="text-muted">Experience: </span>
            {job?.placeholders?.find((p) => p.type === "experience")?.label}
          </p>
          {job?.tagsAndSkills && (
            <p className="card-text">
              <span className="text-muted">Skills: </span>
              {job?.tagsAndSkills}
            </p>
          )}
          <p className="card-text">
            <span className="text-muted">Salary: </span>
            {job?.placeholders?.find((p) => p.type === "salary")?.label}
          </p>
          {job?.minSalary && (
            <p className="card-text">
              <span className="text-muted">Minimum Salary(₹): </span>
              {job?.minSalary}
            </p>
          )}

          <p className="card-text">{job.jobDescription}</p>

          {/* Quick Apply Checkbox */}
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
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

          {/* <button
            className="btn btn-primary"
            disabled={!isQuickApply}
            onClick={handleApply}
          >
            Quick Apply
          </button> */}
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
              class="compImg"
              src={
                job?.imgSrc || "https://img.naukri.com/logo_images/v3/717.gif"
              }
            />
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
