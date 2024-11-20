import React from "react";
import UserProfileForm from "../FreelancerProfile";
import JobPostingForm from "../EmployeeForm";
import { useAuth } from "../../../context/authContext";

function MainForm() {
  const { isEmployer } = useAuth();
  return <>{!isEmployer ? <UserProfileForm /> : <JobPostingForm />}</>;
}
export default MainForm;
