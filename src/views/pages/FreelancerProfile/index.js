// UserProfileForm.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert, Col, Row } from "react-bootstrap";
import Subheader from "../../components/Subheader";
import AutoSuggest from "../../components/AutoSuggest";
import debounce from "lodash.debounce";
import { skillOptions, skillList } from "../../../constants/base";
import { gitHubValidation } from "../../../api/apiCompanies";
import InputField from "../../components/FormInputField";
import useForm from "../../../hooks/useForm";
import { postJobUser } from "../../../actions/jobAction";
import {
  validateUserProfileForm,
  updateLocalStorageObject,
} from "../../../utils/validation";
import { useAuth } from "../../../context/authContext";
import { useDispatch, useSelector } from "react-redux";
const UserProfileForm = () => {
  const [repos, setRepos] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { isEmployer } = useAuth();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const dispatch = useDispatch();
  // Handle changes in skill selection
  const { isloading } = useSelector((state) => state);
  const navigate = useNavigate();

  const initialState = {
    name: "",
    jobTitle: "",
    projectDetail: "",
    tagsAndSkills: [],
    gitHubUsername: "",
    email: "",
    phone: "",
  };

  const onSubmit = async (formData) => {
    try {
      dispatch(postJobUser(formData, isEmployer));
      updateLocalStorageObject("auth", { profile: true });
      setTimeout(
        () => navigate(isEmployer ? "/employer/jobList" : "/user/view/profile"),
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

  const userComp = [
    {
      label: "Name*:",
      id: "name",
      type: "text",
      placeholder: "Enter your name",
      value: formData.name,
      error: errors.name,
    },
    {
      label: "Email*:",
      id: "email",
      type: "text",
      placeholder: "Enter your email",
      value: formData.email,
      error: errors.email,
    },
    {
      label: "phone*:",
      id: "phone",
      type: "number",
      placeholder: "Enter your number",
      value: formData.phone,
      error: errors.phone,
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
  ];
  return (
    <>
      <Subheader name="All Jobs" navigateTab="/user/jobList" />
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="container mt-5">
            <div className="card shadow-lg p-4 mb-5 bg-white rounded">
              <h3 className="text-center mb-4">Create Freelancing Profile</h3>
              {userComp.map((field) => (
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
                label="GitHub Username:"
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
                disabled={isloading}
              >
                {isloading ? "Loading..." : "Submit"}
              </Button>
            </div>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default UserProfileForm;
