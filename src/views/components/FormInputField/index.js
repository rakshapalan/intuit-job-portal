import React from "react";
import { Form, Alert, Col, Row } from "react-bootstrap";

const InputField = ({
  label,
  type = "text",
  value,
  placeholder,
  onChange,
  error,
  as = "input",
  id,
}) => {
  return (
    <Row className="mb-4">
      <Col>
        <Form.Group>
          <Form.Label>{label}</Form.Label>
          <Form.Control
            as={as}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            id={id}
          />
          {error && (
            <Alert className="mt-4" variant="danger">
              {error}
            </Alert>
          )}
        </Form.Group>
      </Col>
    </Row>
  );
};

export default InputField;
