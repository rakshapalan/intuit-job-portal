// utils/validateJobForm.js
export const validateJobForm = (formData) => {
  const errors = {};
  if (!formData?.title) errors.title = "Job title is required";
  if (!formData?.jobDescription)
    errors.jobDescription = "Job requirements are required";
  if (!formData?.companyName) errors.companyName = "Company name is required";
  if (!formData?.contactInfo)
    errors.contactInfo = "Contact information is required";
  if (!formData?.tagsAndSkills)
    errors.tagsAndSkills = "Skill information is required";
  if (!formData?.jobDescriptionFile)
    errors.jobDescriptionFile = "Job description file is required";
  if (
    formData?.jobDescriptionFile &&
    formData?.jobDescriptionFile &&
    formData?.jobDescriptionFile.size > 16 * 1024
  ) {
    errors.jobDescriptionFile = "File size should not exceed 16KB";
  }

  return errors;
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/; // Validates a 10-digit number
  return phoneRegex.test(phone);
};
// utils/validateUserProfileForm.js
export const validateUserProfileForm = (formData) => {
  const errors = {};
  if (!formData?.name) errors.name = "Name is required";
  if (!formData?.jobTitle) errors.jobTitle = "Job Title is required";
  if (formData?.tagsAndSkills?.length === 0)
    errors.tagsAndSkills = "Please select at least one skill.";
  // if (!formData?.gitHubUsername)
  //   errors.gitHubUsername = "GitHub username is required";
  if (!formData?.email) errors.email = "Email is required";
  if (formData?.email && !validateEmail(formData?.email))
    errors.email = "Enter valid email address";
  if (!formData?.phone) errors.phone = "Phone number is required";
  if (formData?.phone && !validatePhone(formData?.phone))
    errors.phone = "Enter valid phone number";
  return errors;
};

// Validate the form before submission
export const validateLoginForm = (formData) => {
  const errors = {};
  if (!formData?.username) errors.username = "Username is required";
  if (!formData?.password) errors.password = "Password is required";
  return errors;
};
export const updateLocalStorageObject = (key, newKeyValue) => {
  const existingData = localStorage.getItem(key);
  const parsedData = existingData ? JSON.parse(existingData) : {};
  Object.assign(parsedData, newKeyValue);
  const updatedData = JSON.stringify(parsedData);

  localStorage.setItem(key, updatedData);
};
