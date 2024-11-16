import React, { useContext } from "react";
import { HeaderContext } from "../../../context/headerContext";
import UserProfileForm from "../FreelancerProfile";
import JobPostingForm from "../EmployeeForm";

function MainForm() {
  const { isEmployer } = useContext(HeaderContext);
  console.log("isEmployer", isEmployer);
  return <>{!isEmployer ? <UserProfileForm /> : <JobPostingForm />}</>;
}
export default MainForm;
