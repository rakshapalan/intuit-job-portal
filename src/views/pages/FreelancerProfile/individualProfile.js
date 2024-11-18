import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, ListGroup, Badge } from "react-bootstrap";
import { user } from "../../../constants/base";
import Subheader from "../../components/Subheader";
import { ShimmerTableRow } from "../../components/DataTableShimmer/index";
import {
  FaPhone,
  FaEnvelope,
  FaBuilding,
  FaDollarSign,
  FaClock,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";

const UserProfile = ({}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <Subheader name="All Jobs" navigateTab="/user/jobList" />
      {loading ? (
        Array(5)
          .fill()
          .map((_, idx) => <ShimmerTableRow key={idx} />)
      ) : (
        <Container className="py-4">
          {/* Section 1: Basic Info */}
          <Card className="p-4 shadow-sm mb-4">
            <Row>
              <Col md={3} className="text-center">
                <img
                  src={user.profilePicture || "https://via.placeholder.com/150"}
                  alt="User Avatar"
                  className="rounded-circle mb-3"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                  }}
                />
              </Col>
              <Col md={9}>
                <h2>{user.name}</h2>
                <Row className="gy-2">
                  <Col sm={6}>
                    <p>
                      <FaPhone className="me-2 text-primary" />
                      <strong>Phone: </strong>
                      {user.phone}
                    </p>
                  </Col>
                  <Col sm={6}>
                    <p>
                      <FaEnvelope className="me-2 text-primary" />
                      <strong>Email: </strong>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </p>
                  </Col>
                  <Col sm={6}>
                    <p>
                      <FaBuilding className="me-2 text-primary" />
                      <strong>Company: </strong>
                      {user.companyName}
                    </p>
                  </Col>
                  <Col sm={6}>
                    <p>
                      <FaClock className="me-2 text-primary" />
                      <strong>Notice Period: </strong>
                      {user.noticePeriod}
                    </p>
                  </Col>
                  <Col sm={6}>
                    <p>
                      <FaDollarSign className="me-2 text-primary" />
                      <strong>Salary: </strong>
                      {user.salary}
                    </p>
                  </Col>
                  <Col sm={6}>
                    <p>
                      <FaMapMarkerAlt className="me-2 text-primary" />
                      <strong>Location: </strong>
                      {user.location || "Not specified"}
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>

          {/* Section 2: Resume Headline */}
          <Card className="p-4 shadow-sm mb-4">
            <h5>Resume Headline</h5>
            <p>{user.resumeHeadline}</p>
          </Card>

          {/* Section 3: Projects */}
          <Card className="p-4 shadow-sm mb-4">
            <h5>Projects</h5>
            <ul>
              {user.projects.map((project, index) => (
                <li key={index}>
                  <strong>{project.title}</strong> at {project.company}
                  <p>{project.description}</p>
                </li>
              ))}
            </ul>
          </Card>

          {/* Section 4: Skills */}
          <Card className="p-4 shadow-sm mb-4">
            <h5>Skills</h5>
            <div>
              {user.skills.map((skill, index) => (
                <span key={index} className="badge bg-primary me-2">
                  {skill}
                </span>
              ))}
            </div>
          </Card>

          {/* Section 5: Education */}
          <Card className="p-4 shadow-sm mb-4">
            <h5>Education</h5>
            <ul>
              {user.education.map((edu, index) => (
                <li key={index}>
                  <strong>{edu.degree}</strong> - {edu.institution} ({edu.year})
                </li>
              ))}
            </ul>
          </Card>

          {/* Section 6: Personal Details */}
          <Card className="p-4 shadow-sm mb-4">
            <h5>Personal Details</h5>
            <Row className="gy-2">
              <Col sm={6}>
                <p>
                  <FaUser className="me-2 text-primary" />
                  <strong>Date of Birth: </strong>
                  {user.dateOfBirth || "Not specified"}
                </p>
              </Col>
              <Col sm={6}>
                <p>
                  <FaMapMarkerAlt className="me-2 text-primary" />
                  <strong>Address: </strong>
                  {user.address || "Not specified"}
                </p>
              </Col>
            </Row>
          </Card>

          {/* Section 7: Accomplishments */}
          <Card className="p-4 shadow-sm mb-4">
            <h5>Accomplishments</h5>
            <ul>
              {user.accomplishments.map((accomplishment, index) => (
                <li key={index}>{accomplishment}</li>
              ))}
            </ul>
          </Card>
        </Container>
      )}
    </>
  );
};

export default UserProfile;
