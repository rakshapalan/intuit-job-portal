// utils/validateJobForm.js
export const validateJobForm = (formData) => {
  const errors = {};
  if (!formData.title) errors.title = "Job title is required";
  if (!formData.jobDescription)
    errors.jobDescription = "Job requirements are required";
  if (!formData.companyName) errors.companyName = "Company name is required";
  if (!formData.contactInfo)
    errors.contactInfo = "Contact information is required";
  if (!formData.tagsAndSkills)
    errors.tagsAndSkills = "Skill information is required";
  return errors;
};

// utils/validateUserProfileForm.js
export const validateUserProfileForm = (formData) => {
  const errors = {};
  if (!formData.name) errors.name = "Name is required";
  if (!formData.jobTitle) errors.jobTitle = "Job Title is required";
  if (formData.skills.length === 0)
    errors.skills = "Please select at least one skill.";
  if (!formData.gitHubUsername)
    errors.gitHubUsername = "GitHub username is required";
  return errors;
};
