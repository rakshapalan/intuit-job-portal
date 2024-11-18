import React, { useContext } from "react";
import { HeaderContext } from "../../../context/headerContext";
import UserProfileForm from "../FreelancerProfile";
import JobPostingForm from "../EmployeeForm";
import { useAuth } from "../../../context/authContext";

function MainForm() {
  const { isEmployer } = useAuth();
  return <>{!isEmployer ? <UserProfileForm /> : <JobPostingForm />}</>;
}
export default MainForm;
