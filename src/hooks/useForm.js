// hooks/useForm.js
import { useState, useCallback } from "react";
import { MAX_FILE_SIZE } from "../constants/base";
const useForm = (initialState, validate) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { id, value } = event.target;
    console.log(id, event.target);
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };
  const handleCheckboxChange = useCallback((event) => {
    const { value, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [event.target.id]: checked
        ? [...prevData[event.target.id], value]
        : prevData[event.target.id].filter((item) => item !== value),
    }));
  }, []);

  const handleSkillChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      ["tagsAndSkills"]: event,
    }));
    // setSelectedSkills(selectedOptions || []); // Update state with selected options
  };
  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    if (file && file.size <= MAX_FILE_SIZE) {
      setFormData((prevData) => ({ ...prevData, jobDescriptionFile: file }));
      setErrors((prevErrors) => ({ ...prevErrors, jobDescriptionFile: "" }));
    } else {
      setFormData((prevData) => ({ ...prevData, jobDescriptionFile: file }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        jobDescriptionFile: "File size should not exceed 16KB",
      }));
    }
  }, []);

  const handleValidation = useCallback(() => {
    const newErrors = validate(formData);
    console.log("handleSubmit", formData, newErrors);
    setErrors({ ...newErrors });
    return Object.keys(newErrors).length === 0;
  }, [formData, validate]);

  const handleSubmit = useCallback(
    (onSubmit) => (event) => {
      event.preventDefault();
      if (handleValidation()) {
        setLoading(true);
        onSubmit(formData).finally(() => setLoading(false));
      }
    },
    [formData, handleValidation]
  );

  return {
    formData,
    errors,
    loading,
    setErrors,
    handleChange,
    handleFileChange,
    handleCheckboxChange,
    handleSkillChange,
    handleSubmit,
  };
};

export default useForm;
