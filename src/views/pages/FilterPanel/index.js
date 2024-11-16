import React, { useEffect, useState, memo, useMemo } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { skillOptions } from "../../../constants/base";
import debounce from "lodash.debounce";

const FilterPage = memo(({ jobList, setJobList, originalData }) => {
  // State for filters
  const [filters, setFilters] = useState({
    skill: "",
    minSalary: "",
  });

  // Debounced filter change
  const debouncedHandleFilterChange = debounce((key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  }, 100);

  // Filtered jobs based on skill and min salary
  const filteredJobs = useMemo(() => {
    const dupliOriginalData = [...originalData];
    return dupliOriginalData?.filter(
      (job) =>
        (filters.skill
          ? job.tagsAndSkills
              .toLowerCase()
              .includes(filters.skill.toLowerCase())
          : true) &&
        (filters.minSalary ? job.minSalary >= filters.minSalary : true)
    );
  }, [jobList, filters.skill, filters.minSalary]);

  useEffect(() => {
    const filterData = filteredJobs;
    console.log("filters", filters);
    if (!filters?.skill && !filters?.minSalary) {
      setJobList(originalData);
    } else {
      setJobList(filterData);
    }
  }, [filters.skill, filters.minSalary]);

  return (
    <div style={{ width: "24%" }}>
      <Card className="p-3 shadow-sm" style={{ height: "600px" }}>
        <h4 className="mb-3 text-center">Filter Jobs</h4>
        <Row className="mb-3">
          {/* Skill Filter */}
          <Col md={12} className="mb-3">
            <Form.Label>Filter by Skill</Form.Label>
            <Autocomplete
              options={skillOptions}
              value={filters.skill}
              onChange={(e, newValue) =>
                debouncedHandleFilterChange("skill", newValue)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select a skill"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Col>

          {/* Minimum Salary Filter */}
          <Col md={12} className="mb-3">
            <Form.Label>Minimum Salary</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter minimum salary"
              value={filters.minSalary}
              onChange={(e) =>
                debouncedHandleFilterChange("minSalary", e.target.value)
              }
            />
          </Col>

          {/* Clear Filter Button */}
          <Col md={12} className="text-center">
            <Button
              variant="secondary"
              className="mt-2 w-100"
              onClick={() => {
                debouncedHandleFilterChange("skill", "");
                debouncedHandleFilterChange("minSalary", "");
                setFilters({ skill: "", minSalary: "" });
              }}
            >
              Clear Filters
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
});

export default FilterPage;
