import React, { useEffect, useState, memo, useMemo, useRef } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { skillOptions } from "../../../constants/base";
import debounce from "lodash.debounce";

const FilterPage = memo(
  ({ jobList, setJobList, originalData, isEmployer, filterRef }) => {
    // State for filters

    const [filters, setFilters] = useState({
      skill: "",
      minSalary: "",
      companyName: "",
    });

    // Debounced filter change
    const debouncedHandleFilterChange = debounce((key, value) => {
      setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
    }, 100);

    // Filtered jobs based on skill and min salary
    const filteredJobs = useMemo(() => {
      const dupliOriginalData = [...originalData];
      console.log("dupliOriginalData", filters, dupliOriginalData);
      return dupliOriginalData?.filter(
        (job) =>
          (filters.skill
            ? job.tagsAndSkills
                .toLowerCase()
                .includes(filters.skill.toLowerCase())
            : true) &&
          (filters.minSalary ? job.minSalary >= filters.minSalary : true) &&
          (filters.companyName
            ? job.companyName
                .toLowerCase()
                .includes(filters.companyName.toLowerCase())
            : true)
      );
    }, [jobList, filters.skill, filters.minSalary, filters.companyName]);

    useEffect(() => {
      const filterData = filteredJobs;
      console.log("filters", filters);
      if (!filters?.skill && !filters?.minSalary && !filters?.companyName) {
        setJobList(originalData);
      } else {
        setJobList(filterData);
      }
    }, [filters.skill, filters.minSalary, filters.companyName]);

    return (
      <div style={{ width: "24%", position: "fixed" }} ref={filterRef}>
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
            {!isEmployer && (
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
            )}
            {isEmployer && (
              <Col md={12} className="mb-3">
                <Form.Label>Company name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Company Name"
                  value={filters.companyName}
                  onChange={(e) =>
                    debouncedHandleFilterChange("companyName", e.target.value)
                  }
                />
              </Col>
            )}

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
  }
);

export default FilterPage;
