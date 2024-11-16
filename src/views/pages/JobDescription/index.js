import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"; // For custom styles (optional)

function JobDescriptionCard({ job }) {
  return (
    <div className="card shadow-sm mb-4 job-card">
      <div className="card-body">
        {/* Header Section */}
        <div className="d-flex align-items-center mb-3">
          <img
            src={job?.imgSrc || "https://img.naukri.com/logo_images/v3/717.gif"}
            loading="lazy"
            className="compImg"
            alt="Lazy-loaded image"
          ></img>
          <div>
            <h5 className="card-title mb-0">{job.title}</h5>
            <p className="text-muted small">{job.companyName}</p>
          </div>
        </div>

        {/* Job Details */}
        <div className="job-details mb-3">
          <p className="mb-1">
            <strong>Location:</strong>{" "}
            {job?.placeholders?.find((p) => p.type === "location")?.label}
          </p>
          <p className="mb-1">
            <strong>Salary:</strong>{" "}
            {job?.placeholders?.find((p) => p.type === "salary")?.label}
          </p>
        </div>

        {/* Tags */}
        {/* <div className="job-tags mb-3">
          {job.tags.map((tag, index) => (
            <span key={index} className="badge bg-secondary me-2">
              {tag}
            </span>
          ))}
        </div> */}

        {/* Apply Button */}
        <div className="d-flex justify-content-end">
          <a
            href={job.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Apply Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default JobDescriptionCard;
