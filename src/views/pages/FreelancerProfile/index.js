// UserProfileForm.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert, Col, Row } from "react-bootstrap";
import Subheader from "../../components/Subheader";
import AutoSuggest from "../../components/AutoSuggest";
import { toast } from "react-toastify";
import debounce from "lodash.debounce";
import { skillOptions, skillList } from "../../../constants/base";
import { createUser, gitHubValidation } from "../../../api/apiCompanies";
import InputField from "../../components/FormInputField";
import useForm from "../../../hooks/useForm";
import { validateUserProfileForm } from "../../../utils/validation";
import { HeaderContext } from "../../../context/headerContext";
const UserProfileForm = () => {
  const [repos, setRepos] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { isEmployer } = useContext(HeaderContext);
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Handle changes in skill selection

  const navigate = useNavigate();

  const initialState = {
    name: "",
    jobTitle: "",
    projectDetail: "",
    tagsAndSkills: [],
    gitHubUsername: "",
  };

  const onSubmit = async (formData) => {
    try {
      const payload = { ...formData, tagsAndSkills: formData.skills };
      await createUser(formData);
      toast.success("User profile created successfully", {
        position: "bottom-right",
        autoClose: 1000,
      });
      setTimeout(
        () => navigate(isEmployer ? "/employer/jobList" : "/user/jobList"),
        1000
      );
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
    handleSkillChange,
    handleSubmit,
  } = useForm(initialState, validateUserProfileForm);
  console.log(formData);
  const fetchGitHubRepos = () => {
    gitHubValidation(formData?.gitHubUsername)
      .then((response) => {
        setFetching(false);
        setRepos(response?.data);
        setSubmitted(false);
      })
      .catch((error) => {
        setRepos([]);
        setSubmitted(true);
        setFetching(false);
        setErrors((prevErrors) => ({
          ...prevErrors,
          gitHubUsername: "GitHub user not found or invalid.",
        }));
      });
  };
  // Debounced filter change
  const debouncedFetchGitHubRepos = debounce(() => {
    if (formData?.gitHubUsername) {
      fetchGitHubRepos();
    }
  }, 1000);
  console.log("formData", formData);
  return (
    <>
      <Subheader name="All Jobs" navigateTab="/user/jobList" />
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
                <InputField
                  key={field?.id}
                  id={field?.id}
                  {...field}
                  onChange={handleChange}
                  value={formData[field?.name]}
                />
              ))}

              {/* Skills Selection */}
              <Row className="mb-4">
                <Col>
                  <Form.Group>
                    <div className="flex flex-wrap">
                      <AutoSuggest
                        skillList={skillList}
                        title={"Add Skills*"}
                        selectedSkills={formData?.tagsAndSkills}
                        handleSkillChange={handleSkillChange}
                        id="tagsAndSkills"
                      />
                      {/* {skillOptions?.map((skill) => (
                        <Form.Check
                          key={skill}
                          type="checkbox"
                          value={skill}
                          className="ps-5"
                          label={skill}
                          onChange={handleCheckboxChange}
                          checked={formData?.tagsAndSkills?.includes(skill)}
                          name="tagsAndSkills"
                          id="tagsAndSkills"
                        />
                      ))} */}
                    </div>
                    {errors.tagsAndSkills && (
                      <Alert className="mt-4" variant="danger">
                        {errors.tagsAndSkills}
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
                name="gitHubUsername"
              />
              <Button
                className="mb-4 w-25"
                variant="primary"
                onClick={() => {
                  setFetching(true);
                  debouncedFetchGitHubRepos();
                }}
                disabled={submitted}
              >
                {fetching ? "Loading..." : "Fetch GitHub Projects"}
              </Button>

              {/* GitHub Repositories */}
              {repos?.length > 0 && (
                <Row className="mb-4">
                  <Col>
                    <h6>Your GitHub Projects:</h6>
                    <div className="d-flex flex-wrap">
                      {repos.map((repo) => (
                        <div className="d-flex ml-2" key={repo.id}>
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {repo.name}
                          </a>
                        </div>
                      ))}
                    </div>
                  </Col>
                </Row>
              )}

              {/* Submit Button */}
              <Button
                className=""
                type="submit"
                variant="primary"
                disabled={loading}
              >
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
