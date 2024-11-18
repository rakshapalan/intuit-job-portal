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
    console.log(
      "check",
      formData?.jobDescriptionFile,
      formData,
      formData?.jobDescriptionFile.size,
      formData?.jobDescriptionFile &&
        formData?.jobDescriptionFile.size <= 16 * 1024
    );
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
  if (!formData?.gitHubUsername)
    errors.gitHubUsername = "GitHub username is required";
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
  // Step 1: Retrieve the object from local storage
  const existingData = localStorage.getItem(key);

  // Step 2: Parse the existing data or create an empty object if it doesn't exist
  const parsedData = existingData ? JSON.parse(existingData) : {};

  // Step 3: Add the new key-value pair
  Object.assign(parsedData, newKeyValue);

  // Step 4: Convert back to JSON string
  const updatedData = JSON.stringify(parsedData);

  // Step 5: Save the updated object back to local storage
  localStorage.setItem(key, updatedData);
};
