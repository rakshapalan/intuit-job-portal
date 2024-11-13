// UserProfileForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert, Col, Row } from "react-bootstrap";
import Subheader from "../../components/Subheader";
import { toast } from "react-toastify";
import { skillOptions } from "../../../constants/base";
import { createUser, gitHubValidation } from "../../../api/apiCompanies";
import InputField from "../../components/FormInputField";
import useForm from "../../../hooks/useForm";
import { validateUserProfileForm } from "../../../utils/validation";

const UserProfileForm = () => {
  const [repos, setRepos] = useState([]);
  const [skills, setSkills] = useState([]);
  const [gitHubUsername, setGitHubUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const initialState = {
    name: "",
    jobTitle: "",
    projectDetail: "",
    skills: [],
    gitHubUsername: "",
  };

  const onSubmit = async (formData) => {
    try {
      const payload = { ...formData, tagsAndSkills: formData.skills };
      await createUser(payload);
      toast.success("User profile created successfully", {
        position: "bottom-right",
        autoClose: 1000,
      });
      setTimeout(() => navigate("/jobList"), 1000);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const {
    formData,
    errors,
    loading,
    setErrors,
    handleChange,
    handleCheckboxChange,
    handleSubmit,
  } = useForm(initialState, validateUserProfileForm);

  const fetchGitHubRepos = () => {
    gitHubValidation(formData.gitHubUsername)
      .then((response) => {
        setRepos(response.data);
        setSubmitted(false);
      })
      .catch((error) => {
        setRepos([]);
        setSubmitted(true);
        setErrors((prevErrors) => ({
          ...prevErrors,
          gitHubUsername: "GitHub user not found or invalid.",
        }));
      });
  };

  return (
    <>
      <Subheader name="All Jobs" navigateTab="/jobList" />
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="container mt-5">
            <div className="card shadow-lg p-4 mb-5 bg-white rounded">
              <h3 className="text-center mb-4">Create Freelancing Profile</h3>
              {[
                {
                  label: "Name*:",
                  id: "name",
                  type: "text",
                  placeholder: "Enter your name",
                  value: formData.name,
                  error: errors.name,
                },
                {
                  label: "Current Job Title*:",
                  id: "jobTitle",
                  type: "text",
                  placeholder: "Enter your job title",
                  value: formData.jobTitle,
                  error: errors.jobTitle,
                },
                {
                  label: "Project Details:",
                  id: "projectDetail",
                  type: "textarea",
                  placeholder: "Enter your project details",
                  value: formData.projectDetail,
                  error: errors.projectDetail,
                },
              ].map((field) => (
                <InputField key={field.id} {...field} onChange={handleChange} />
              ))}

              {/* Skills Selection */}
              <Row className="mb-4">
                <Col>
                  <Form.Group>
                    <Form.Label>Skills*:</Form.Label>
                    <div className="flex flex-wrap">
                      {skillOptions.map((skill) => (
                        <Form.Check
                          key={skill}
                          type="checkbox"
                          value={skill}
                          className="ps-5"
                          label={skill}
                          onChange={handleCheckboxChange}
                          checked={formData.skills.includes(skill)}
                          name="skills"
                        />
                      ))}
                    </div>
                    {errors.skills && (
                      <Alert className="mt-4" variant="danger">
                        {errors.skills}
                      </Alert>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              {/* GitHub Profile Input */}
              <InputField
                label="GitHub Username*:"
                type="text"
                value={formData.gitHubUsername}
                placeholder="Enter your GitHub username"
                onChange={handleChange}
                error={errors.gitHubUsername}
                id="gitHubUsername"
              />
              <Button
                className="mb-4"
                variant="primary"
                onClick={fetchGitHubRepos}
                disabled={submitted}
              >
                Fetch GitHub Projects
              </Button>

              {/* GitHub Repositories */}
              {repos.length > 0 && (
                <Row className="mb-4">
                  <Col>
                    <h3>Your GitHub Projects:</h3>
                    <ul>
                      {repos.map((repo) => (
                        <li key={repo.id}>
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {repo.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </Col>
                </Row>
              )}

              {/* Submit Button */}
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? "Loading..." : "Submit"}
              </Button>
            </div>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default UserProfileForm;
