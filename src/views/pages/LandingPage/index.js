import React from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { FaUserTie, FaUser } from "react-icons/fa"; // For icons
import { useNavigate } from "react-router-dom";
import "./index.css";

const HireOrApply = () => {
  const navigate = useNavigate();
  const handleHireClick = (link) => {
    navigate(link);
    // Navigate to the "Post Job" page
    console.log("Redirect to post a job page");
  };

  const handleApplyClick = () => {
    // Navigate to the "Job Listings" or "Apply" page
    console.log("Redirect to apply for jobs page");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center mainclass w-100"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <div className="d-flex w-100 h-100">
        <div className=""></div>

        <div className="subclass">
          <Col md={3} className="mb-4">
            <Card
              className="shadow-lg border-primary rounded"
              style={{
                height: "260px",
                backgroundColor: "#e9f7fc",
                cursor: "pointer",
              }}
              onClick={() => handleHireClick("/employer/login")}
            >
              <Card.Body>
                <FaUserTie size={50} color="#007bff" />
                <Card.Title className="mt-3">Want to Hire?</Card.Title>
                <Card.Text>
                  Are you looking for candidates to fill positions in your
                  company? Post your job openings here.
                </Card.Text>
                <Button variant="primary">Post a Job</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3} className="mb-4">
            <Card
              className="shadow-lg border-success rounded"
              style={{
                height: "260px",
                backgroundColor: "#d4edda",
                cursor: "pointer",
              }}
              onClick={() => handleHireClick("/user/login")}
            >
              <Card.Body>
                <FaUser size={50} color="#28a745" />
                <Card.Title className="mt-3">Want to Apply?</Card.Title>
                <Card.Text>
                  Looking for job opportunities? Browse available positions and
                  apply.
                </Card.Text>
                <Button variant="success">Browse Jobs</Button>
              </Card.Body>
            </Card>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default HireOrApply;
