import React, { useState, useEffect, useContext } from "react";
import { JobCard, EmployeeCard } from "../../components/Jobcard";
import { toast } from "react-toastify";
import { ShimmerTableRow } from "../../components/DataTableShimmer/index";
import { applyToJob } from "../../../api/apiCompanies";
import data from "../../../data/data.json";
import Subheader from "../../components/Subheader";
import debounce from "lodash.debounce";
import "./index.css";
import { JobContext } from "../../../context/jobContext";
import FilterPage from "../FilterPanel/index";
import notFound from "../../../assets/no-result-found.avif";
import { Pagination } from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJobs } from "../../../actions/jobAction";
import { HeaderContext } from "../../../context/headerContext";
function JobCardList() {
  const { isEmployer } = useContext(HeaderContext);
  const [loading, setLoading] = useState(false);
  const [jobList, setJobList] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [limit] = useState(10); // Number of jobs per page
  const [quickAppliedJobs, setQuickAppliedJobs] = useState([]);
  const [page, setPage] = useState(1);
  const pages = 12;

  let jsonData = data.data;
  console.log("data", jsonData);
  const dispatch = useDispatch();
  // const { state } = useContext(JobContext);
  const { isloading, job } = useSelector((state) => state);
  const paginate = true;
  //UI pagination by loading 10k data

  // useEffect(() => {
  //   const firstPageIndex = (page - 1) * pages;
  //   const lastPageIndex = firstPageIndex + pages;
  //   const currentTableData = jsonData.slice(firstPageIndex, lastPageIndex);

  //   setJobList(currentTableData);
  //   setOriginalData(currentTableData);
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }, [page]);
  useEffect(() => {
    dispatch(fetchAllJobs(isEmployer));
  }, [dispatch]);

  useEffect(() => {
    if (job?.length > 0) {
      setJobList(job); // Update the jobList in the context with the Redux state
      setOriginalData(job);
    }
  }, [job, setJobList]);

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

  const debounceQuickApply = debounce(() => {
    quickApply();
  }, 1000);
  const handleApply = (job) => {
    setQuickAppliedJobs([...quickAppliedJobs, job?.jobId]);
  };

  const viewAllApplicants = () => {
    window.open("/employer/allApplicants");
  };

  return (
    <>
      <Subheader
        name={isEmployer ? "Post new Job" : "Create Profile"}
        secondaryText={!isEmployer ? "Apply to" : null}
        secondaryFunc={debounceQuickApply}
        loading={loading}
        quickAppliedJobs={quickAppliedJobs}
        navigateTab={isEmployer ? "/employer/profile" : "/user/profile"}
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
              />

              <div className="flex flex-column" style={{ width: "56%" }}>
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

            {paginate && (
              <Pagination
                page={page}
                setPage={setPage}
                pages={Math.floor(jsonData?.length / pages)}
                hasNextPage={page < jsonData?.length / pages}
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
