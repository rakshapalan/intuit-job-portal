// JobPostingForm.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../../../api/apiCompanies";
import { toast } from "react-toastify";
import { skillList } from "../../../constants/base";
import AutoSuggest from "../../components/AutoSuggest";
import { useDispatch, useSelector } from "react-redux";
import Subheader from "../../components/Subheader";
import InputField from "../../components/InputField";
import { Form, Button, Container, Alert, Col, Row } from "react-bootstrap";
import useForm from "../../../hooks/useForm";
import { validateJobForm } from "../../../utils/validation";
import { postJob } from "../../../actions/jobAction";
import { HeaderContext } from "../../../context/headerContext";
import { useAuth } from "../../../context/authContext";
const JobPostingForm = () => {
  const { isEmployer } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    loading,
    handleChange,
    handleFileChange,
    handleSkillChange,
    handleSubmit,
  } = useForm(initialState, validateJobForm);

  const onSubmit = async (formData) => {
    try {
      await createJob(formData);
      toast.success("Job created successfully", {
        position: "bottom-right",
        autoClose: 1000,
      });
      setTimeout(() => {
        navigateList();
      }, 1000);
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
  console.log(formData);
  return (
    <>
      <Subheader name={"All Jobs"} navigateTab={"/employer/joblist"} />
      <Form onSubmit={handleSubmit(onSubmit)} className="p-3">
        <div className="container mt-5">
          <div className="card shadow-lg p-4 mb-5 bg-white rounded">
            <h5 className="text-left text-primary mb-4">Basic Job Details</h5>
            {fields.slice(0, 4)?.map((field, index) => (
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
            {fields?.slice(4)?.map((field, index) => (
              <InputField
                key={index + 4}
                id={field?.id}
                value={formData[field.id]}
                onChange={field.onChange || handleChange}
                {...field}
              />
            ))}
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </Form>
    </>
  );
};

export default JobPostingForm;
