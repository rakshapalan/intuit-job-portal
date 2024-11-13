// src/Components/InputField.js
import React from "react";

const InputField = ({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  accept,
}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className="form-control"
          placeholder={placeholder}
        />
      ) : type === "file" ? (
        <input
          type="file"
          name={name}
          accept={accept}
          onChange={onChange}
          className="form-control-file"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="form-control"
          placeholder={placeholder}
        />
      )}
      {error && <small style={{ color: "red" }}>{error}</small>}
    </div>
  );
};

export default InputField;
