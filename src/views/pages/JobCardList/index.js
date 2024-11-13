import React, { useState, useEffect, useContext } from "react";
import { JobCard, EmployeeCard } from "./JobCard";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { ShimmerTableRow } from "../../components/DataTableShimmer/index";
import {
  getEmployerJobs,
  getFreeLanceJobs,
  getPaginatedJobs,
  applyToJob,
} from "../../../api/apiCompanies";
import data from "../../../data/data.json";
import Subheader from "../../components/Subheader";
import styled from "styled-components";
import "./index.css";
import ReactPaginate from "react-paginate";
import { JobContext } from "../../context/jobContext";
import FilterPage from "../FilterPanel/index";
import notFound from "../../../assets/no-result-found.avif";
import { Pagination } from "../../components/Pagination";

function JobCardList() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [jobList, setJobList] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10); // Number of jobs per page

  const { state } = useContext(JobContext);
  const [quickAppliedJobs, setQuickAppliedJobs] = useState([]);
  const [page, setPage] = useState(1);
  const pages = 12;
  const pathName = location.pathname;
  const isEmployer = pathName?.includes("employee");

  // static data
  // useEffect(() => {
  //   const firstPageIndex = (page - 1) * pages;
  //   const lastPageIndex = firstPageIndex + pages;
  //   const currentTableData = data.slice(firstPageIndex, lastPageIndex);
  //   console.log(data.lengt, data, firstPageIndex, lastPageIndex);
  //   setJobList(currentTableData);
  //   setOriginalData(currentTableData);
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }, [page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // fetchPaginatedJobs((page - 1) * pages);
    fetchJobs();
  }, [offset]);

  const fetchPaginatedJobs = (currentOffset) => {
    setLoading(true);
    const apiFunction = isEmployer ? getEmployerJobs : getPaginatedJobs;

    apiFunction({ offset: 10, limit })
      .then((res) => {
        setJobList(res?.data);
        setOriginalData(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      });
  };

  const fetchJobs = () => {
    setLoading(true);
    const apiFunction = isEmployer ? getEmployerJobs : getFreeLanceJobs;

    apiFunction()
      .then((res) => {
        setJobList(res?.data?.jobDetails);
        setOriginalData(res?.data?.jobDetails);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      });
  };

  const quickApply = () => {
    setLoading(true);
    applyToJob({ jobIdList: quickAppliedJobs })
      .then((res) => {
        setQuickAppliedJobs([]);
        toast.success("Applied to job successfully", {
          position: "bottom-right",
          autoClose: 1000,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error applying to job:", err);
        setLoading(false);
      });
  };

  const handleApply = (job) => {
    setQuickAppliedJobs([...quickAppliedJobs, job?.jobId]);
  };

  const viewAllApplicants = () => {
    window.open("/allApplicants");
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setOffset(selectedPage * limit); // Update offset based on selected page
  };

  return (
    <>
      <Subheader
        name={isEmployer ? "Post new Job" : "Create Profile"}
        secondaryText={!isEmployer ? "Apply to" : null}
        secondaryFunc={quickApply}
        loading={loading}
        quickAppliedJobs={quickAppliedJobs}
        navigateTab={isEmployer ? "/employeeprofile" : "/userprofile"}
      />

      {loading ? (
        Array(5)
          .fill()
          .map((_, idx) => <ShimmerTableRow key={idx} />)
      ) : (
        <div className="job-card-list">
          <div className="d-flex" style={{ gap: "40px" }}>
            <FilterPage
              jobList={jobList}
              setJobList={setJobList}
              originalData={originalData}
            />

            <div className="flex flex-column" style={{ width: "56%" }}>
              {jobList?.length > 0 ? (
                jobList?.map((item) =>
                  isEmployer ? (
                    <EmployeeCard
                      key={item.jobId}
                      job={item}
                      viewAllApplicants={viewAllApplicants}
                    />
                  ) : (
                    <JobCard
                      key={item.jobId}
                      job={item}
                      quickAppliedJobs={quickAppliedJobs}
                      handleApply={handleApply}
                    />
                  )
                )
              ) : (
                <img src={notFound} alt="No search results found" />
              )}
            </div>
          </div>
          <Pagination
            page={page}
            setPage={setPage}
            pages={Math.floor(data?.length / pages)}
            hasNextPage={page < pages}
          />
          {/* Pagination Controls */}
        </div>
      )}
    </>
  );
}

export default JobCardList;
