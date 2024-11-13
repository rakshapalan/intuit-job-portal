// JobPostingForm.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { JobContext } from "../../context/jobContext";
import { createJob } from "../../../api/apiCompanies";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Subheader from "../../components/Subheader";
import InputField from "../../components/InputField";
import useForm from "../../../hooks/useForm";
import { validateJobForm } from "../../../utils/validation";
import { postJob } from "../../../actions/jobAction";

const JobPostingForm = () => {
  const navigate = useNavigate();
  // const { dispatch } = useContext(JobContext);
  const dispatch = useDispatch();
  // const postJob = () => navigate("/employeeList");

  const initialState = {
    jobDescriptionFile: null,
    title: "",
    jobDescription: "",
    tagsAndSkills: "",
    companyName: "",
    contactInfo: "",
  };

  const onSubmit = (formData) => {
    dispatch(postJob(formData)); // Dispatch the Redux action
  };

  // const onSubmit = async (formData) => {
  //   try {
  //     await createJob(formData);
  //     toast.success("Job created successfully", {
  //       position: "bottom-right",
  //       autoClose: 1000,
  //     });
  //     setTimeout(() => {
  //       postJob();
  //     }, 1000);
  //   } catch (err) {
  //     console.error("Error creating job:", err);
  //   }
  // };

  const {
    formData,
    errors,
    loading,
    handleChange,
    handleFileChange,
    handleSubmit,
  } = useForm(initialState, validateJobForm);

  const fields = [
    {
      label: "Job Title*",
      name: "title",
      type: "text",
      placeholder: "Describe the job title",
      error: errors.title,
    },
    {
      label: "Job Description*",
      name: "jobDescription",
      type: "textarea",
      placeholder: "Describe the job requirements",
      error: errors.jobDescription,
    },
    {
      label: "Skills*",
      name: "tagsAndSkills",
      type: "text",
      placeholder: "Enter relevant tags (comma-separated)",
      error: errors.tagsAndSkills,
    },
    {
      label: "Job Description File (Max 16KB)",
      name: "jobDescriptionFile",
      type: "file",
      accept: ".pdf,.doc,.docx",
      error: errors.jobDescriptionFile,
      onChange: handleFileChange,
    },
    {
      label: "Company Name*",
      name: "companyName",
      type: "text",
      placeholder: "Enter company name",
      error: errors.companyName,
    },
    {
      label: "Contact Information*",
      name: "contactInfo",
      type: "number",
      placeholder: "Enter contact info",
      error: errors.contactInfo,
    },
  ];

  return (
    <>
      <Subheader name={"All Jobs"} navigateTab={"/employeeList"} />
      <form onSubmit={handleSubmit(onSubmit)} className="p-3">
        <div className="container mt-5">
          <div className="card shadow-lg p-4 mb-5 bg-white rounded">
            <h5 className="text-left text-primary mb-4">Basic Job Details</h5>
            {fields.slice(0, 4).map((field, index) => (
              <InputField
                key={index}
                {...field}
                value={formData[field.name]}
                onChange={field.onChange || handleChange}
              />
            ))}
          </div>
        </div>
        <div className="container mt-5">
          <div className="card shadow-lg p-4 mb-4 bg-white rounded">
            <h5 className="text-left text-primary mb-4">About Your Company</h5>
            {fields.slice(4).map((field, index) => (
              <InputField
                key={index + 4}
                {...field}
                value={formData[field.name]}
                onChange={handleChange}
              />
            ))}
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
};

export default JobPostingForm;
