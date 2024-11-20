import React, { useState, useEffect, useRef } from "react";
import { JobCard, EmployeeCard } from "../../components/Jobcard";
import { ShimmerTableRow } from "../../components/DataTableShimmer/index";
import data from "../../../data/data.json";
import Subheader from "../../components/Subheader";
import debounce from "lodash.debounce";
import "./index.css";
import FilterPage from "../FilterPanel/index";
import notFound from "../../../assets/no-result-found.avif";
import { Pagination } from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJobs, applyToUserJob } from "../../../actions/jobAction";
import useWindowResize from "../../../hooks/useWindowResize";
import { useAuth } from "../../../context/authContext";
function JobCardList() {
  const { isEmployer, auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [jobList, setJobList] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [quickAppliedJobs, setQuickAppliedJobs] = useState([]);
  const [page, setPage] = useState(1);
  const pages = 12;
  const filterRef = useRef(null);
  let jsonData = data.data;
  const dispatch = useDispatch();
  const { isloading, job } = useSelector((state) => state);
  const { filterWidth } = useWindowResize(filterRef);

  //UI pagination by loading 10k data

  // useEffect(() => {
  //   const firstPageIndex = (page - 1) * pages;
  //   const lastPageIndex = firstPageIndex + pages;
  //   const currentTableData = jsonData.slice(firstPageIndex, lastPageIndex);

  //   setJobList(currentTableData);
  //   setOriginalData(currentTableData);
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }, [page]);

  //api call

  useEffect(() => {
    dispatch(fetchAllJobs(isEmployer));
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (job?.length > 0) {
      const firstPageIndex = (page - 1) * pages;
      const lastPageIndex = firstPageIndex + pages;
      const currentTableData = job.slice(firstPageIndex, lastPageIndex);

      setJobList(currentTableData);
      setOriginalData(currentTableData);

      // setJobList(job); // Update the jobList in the context with the Redux state
      // setOriginalData(job);
    }
  }, [job, setJobList, page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [jobList]);

  const quickApply = () => {
    try {
      dispatch(applyToUserJob(quickAppliedJobs));
      setQuickAppliedJobs([]);
    } catch (err) {
      console.error("Error applying to job:", err);
    }
  };

  const debounceQuickApply = debounce(() => {
    quickApply();
  }, 1000);
  const handleApply = (job) => {
    setQuickAppliedJobs((prevJobs) => {
      if (prevJobs.includes(job?.jobId)) {
        // Remove the job if it's already selected
        return prevJobs.filter((id) => id !== job?.jobId);
      } else {
        // Add the job if it's not already selected
        return [...prevJobs, job?.jobId];
      }
    });
  };

  const viewAllApplicants = () => {
    window.open("/employer/allApplicants");
  };
  console.log("auth", auth);

  return (
    <>
      <Subheader
        name={
          isEmployer
            ? "Post new Job"
            : auth?.profile
            ? "View profile"
            : "Create Profile"
        }
        secondaryText={!isEmployer ? "Apply to" : null}
        secondaryFunc={debounceQuickApply}
        loading={loading}
        quickAppliedJobs={quickAppliedJobs}
        navigateTab={
          isEmployer
            ? "/employer/profile"
            : auth?.profile
            ? "/user/view/profile"
            : "/user/profile"
        }
      />

      {isloading || loading ? (
        Array(5)
          .fill()
          .map((_, idx) => <ShimmerTableRow key={idx} />)
      ) : (
        <>
          <div className="job-card-list">
            <div className="d-flex" style={{ gap: "40px" }}>
              <FilterPage
                jobList={jobList}
                setJobList={setJobList}
                originalData={originalData}
                isEmployer={isEmployer}
                filterRef={filterRef}
              />

              <div
                className="flex flex-column"
                style={{
                  width: "56%",
                  marginLeft: `${filterWidth + 20}px`,
                }}
              >
                {jobList && jobList?.length > 0 ? (
                  jobList.map((item) =>
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
                  <div className="d-flex justify-content-center mt-4">
                    <img src={notFound} alt="No search results found" />
                  </div>
                )}
              </div>
            </div>

            {job?.length > pages && jobList?.length >= pages && (
              <Pagination
                page={page}
                setPage={setPage}
                pages={Math.floor(job?.length / pages)}
                hasNextPage={page < Math.floor(job?.length / pages)}
                // pages={Math.floor(jsonData?.length / pages)}
                // hasNextPage={page < Math.floor(jsonData?.length / pages)}
                style={{ marginLeft: `${filterWidth + 20}px` }}
              />
            )}
            {/* Pagination Controls */}
          </div>
        </>
      )}
    </>
  );
}

export default JobCardList;
