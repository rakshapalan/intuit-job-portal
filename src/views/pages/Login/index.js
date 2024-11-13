import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  Row,
  Col,
} from "react-bootstrap";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate the form before submission
  const validateForm = () => {
    const errors = {};
    if (!formData.username) errors.username = "Username is required";
    if (!formData.password) errors.password = "Password is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        console.log("Login successful");
      }, 1000);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f4f7f9" }}
    >
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <Card
            className="shadow-lg p-4 mb-5 bg-white rounded"
            style={{
              borderRadius: "15px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3 className="text-center text-primary mb-4">Login</h3>
            <Form onSubmit={handleSubmit}>
              {/* Username Field */}
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  isInvalid={!!formErrors.username}
                  className="mb-3"
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.username}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Password Field */}
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  isInvalid={!!formErrors.password}
                  className="mb-3"
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.password}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Error Message */}
              {formErrors.username || formErrors.password ? (
                <Alert variant="danger" className="mt-3">
                  Please fill in all required fields.
                </Alert>
              ) : null}

              {/* Login Button */}
              <Button
                variant="primary"
                type="submit"
                className="w-100 py-2"
                disabled={loading}
                style={{
                  backgroundColor: "#007bff",
                  borderColor: "#007bff",
                  borderRadius: "25px",
                  fontWeight: "bold",
                }}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Form>

            <div className="mt-3 text-center">
              <a href="#" style={{ textDecoration: "none", color: "#007bff" }}>
                Forgot Password?
              </a>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
