import React, { useState } from "react";
import Select from "react-select";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Sample skill suggestions

function AutoSuggest({
  skillList,
  title,
  handleSkillChange,
  selectedSkills,
  id,
  className,
}) {
  return (
    <div className={`container ${className}`} style={{ padding: "0px" }}>
      <Form.Label>{title}</Form.Label>
      <Select
        options={skillList} // Pass the skill options
        isMulti // Enable multi-select
        value={selectedSkills} // Controlled value
        onChange={handleSkillChange} // Handle skill selection
        placeholder="Type to search skills..."
        className="basic-multi-select"
        classNamePrefix="select"
        id={id}
      />
    </div>
  );
}

export default AutoSuggest;
