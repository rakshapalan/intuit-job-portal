import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import useForm from "../../../hooks/useForm";
import { validateLoginForm } from "../../../utils/validation";
import { HeaderContext } from "../../../context/headerContext";
import { useAuth } from "../../../context/authContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const initialState = {
    username: "",
    password: "",
  };
  const { isEmployer } = useAuth();
  const { formData, errors, loading, handleChange, handleSubmit } = useForm(
    initialState,
    validateLoginForm
  );

  const { login } = useAuth();
  const role = isEmployer ? "employer" : "user";
  const onSubmit = async (formData) => {
    try {
      login(formData.username, formData.password, role);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  // Handle form submission

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
            <Form onSubmit={handleSubmit(onSubmit)}>
              {/* Username Field */}
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  isInvalid={!!errors.username}
                  className="mb-3"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
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
                  isInvalid={!!errors.password}
                  className="mb-3"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Error Message */}
              {errors.username || errors.password ? (
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
