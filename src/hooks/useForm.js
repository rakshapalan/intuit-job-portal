// hooks/useForm.js
import { useState, useCallback } from "react";
import { MAX_FILE_SIZE } from "../constants/base";
const useForm = (initialState, validate) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);
  const handleCheckboxChange = useCallback((event) => {
    const { value, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: checked
        ? [...prevData[event.target.name], value]
        : prevData[event.target.name].filter((item) => item !== value),
    }));
  }, []);
  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    if (file && file.size <= MAX_FILE_SIZE) {
      setFormData((prevData) => ({ ...prevData, jobDescriptionFile: file }));
      setErrors((prevErrors) => ({ ...prevErrors, jobDescriptionFile: "" }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        jobDescriptionFile: "File size should not exceed 16KB",
      }));
    }
  }, []);
  console.log("errors", errors);
  const handleValidation = useCallback(() => {
    const newErrors = validate(formData);
    setErrors({ jobDescriptionFile: errors?.jobDescriptionFile, ...newErrors });
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
    handleSubmit,
  };
};

export default useForm;
