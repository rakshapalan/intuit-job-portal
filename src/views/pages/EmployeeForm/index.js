// JobPostingForm.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { skillList } from "../../../constants/base";
import AutoSuggest from "../../components/AutoSuggest";
import { useDispatch, useSelector } from "react-redux";
import Subheader from "../../components/Subheader";
import InputField from "../../components/InputField";
import { Form } from "react-bootstrap";
import useForm from "../../../hooks/useForm";
import { validateJobForm } from "../../../utils/validation";
import { postJobUser } from "../../../actions/jobAction";
import { useAuth } from "../../../context/authContext";
const JobPostingForm = () => {
  const { isEmployer } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isloading } = useSelector((state) => state);

  const navigateList = () =>
    navigate(isEmployer ? "/employer/jobList" : "/user/jobList");
  const initialState = {
    jobDescriptionFile: null,
    title: "",
    jobDescription: "",
    tagsAndSkills: "",
    companyName: "",
    contactInfo: "",
  };
  const {
    formData,
    errors,
    handleChange,
    handleFileChange,
    handleSkillChange,
    handleSubmit,
  } = useForm(initialState, validateJobForm);

  const onSubmit = async (formData) => {
    try {
      dispatch(postJobUser(formData, isEmployer));
      setTimeout(() => {
        navigateList();
      }, 2000);
    } catch (err) {
      console.error("Error creating job:", err);
    }
  };

  const fields = [
    {
      label: "Job Title*",
      id: "title",
      type: "text",
      placeholder: "Describe the job title",
      value: formData.title,
      error: errors.title,
    },
    {
      label: "Job Description*",
      id: "jobDescription",
      type: "textarea",
      placeholder: "Describe the job requirements",
      value: formData.jobDescription,
      error: errors.jobDescription,
    },
    {
      label: "Skills*",
      id: "tagsAndSkills",
      type: "text",
      placeholder: "Enter relevant tags (comma-separated)",
      value: formData.tagsAndSkills,
      error: errors.tagsAndSkills,
    },
    {
      label: "Job Description File (Max 16KB)*",
      id: "jobDescriptionFile",
      type: "file",
      accept: ".pdf,.doc,.docx",
      value: formData.jobDescriptionFile,
      error: errors.jobDescriptionFile,
      onChange: handleFileChange,
    },
  ];

  const companyFields = [
    {
      label: "Company Name*",
      id: "companyName",
      type: "text",
      placeholder: "Enter company name",
      value: formData.companyName,
      error: errors.companyName,
    },
    {
      label: "Contact Information*",
      id: "contactInfo",
      type: "number",
      placeholder: "Enter contact info",
      value: formData.contactInfo,
      error: errors.contactInfo,
    },
  ];

  return (
    <>
      <Subheader name={"All Jobs"} navigateTab={"/employer/joblist"} />
      <Form onSubmit={handleSubmit(onSubmit)} className="p-3">
        <div className="container mt-5">
          <div className="card shadow-lg p-4 mb-5 bg-white rounded">
            <h5 className="text-left text-primary mb-4">Basic Job Details</h5>
            {fields?.map((field) => (
              <>
                {field?.id != "tagsAndSkills" && (
                  <InputField
                    key={field?.id}
                    id={field?.id}
                    {...field}
                    onChange={field.onChange || handleChange}
                    value={formData[field.id]}
                  />
                )}

                {field?.id === "tagsAndSkills" && (
                  <>
                    <AutoSuggest
                      skillList={skillList}
                      title={"Add Skills*"}
                      selectedSkills={formData?.tagsAndSkills}
                      handleSkillChange={handleSkillChange}
                      id={field?.id}
                      className={"mb-2"}
                    />
                    {errors.tagsAndSkills && (
                      <small style={{ color: "red", marginBottom: "12px" }}>
                        {errors.tagsAndSkills}
                      </small>
                    )}
                  </>
                )}
              </>
            ))}
          </div>
        </div>
        <div className="container mt-5">
          <div className="card shadow-lg p-4 mb-4 bg-white rounded">
            <h5 className="text-left text-primary mb-4">About Your Company</h5>
            {companyFields?.map((field, index) => (
              <InputField
                key={index + 4}
                id={field?.id}
                value={formData[field.id]}
                onChange={field.onChange || handleChange}
                {...field}
              />
            ))}
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isloading}
          >
            {isloading ? "Loading..." : "Submit"}
          </button>
        </div>
      </Form>
    </>
  );
};

export default JobPostingForm;
