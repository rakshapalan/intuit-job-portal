// actions/jobActions.js
import {
  createJob,
  getEmployerJobs,
  getFreeLanceJobs,
} from "../api/apiCompanies"; // import your existing createJob function
import { toast } from "react-toastify";

// Action Types
export const POST_JOB_REQUEST = "POST_JOB_REQUEST";
export const POST_JOB_SUCCESS = "POST_JOB_SUCCESS";
export const POST_JOB_FAILURE = "POST_JOB_FAILURE";
export const FETCH_JOBS_REQUEST = "FETCH_JOBS_REQUEST";
export const FETCH_JOBS_SUCCESS = "FETCH_JOBS_SUCCESS";
export const FETCH_JOBS_FAILURE = "FETCH_JOBS_FAILURE";

// Action Creators
export const postJobRequest = () => ({
  type: POST_JOB_REQUEST,
});

export const postJobSuccess = (job) => ({
  type: POST_JOB_SUCCESS,
  payload: job,
});

export const postJobFailure = (error) => ({
  type: POST_JOB_FAILURE,
  payload: error,
});

export const fetchJobsRequest = () => ({
  type: FETCH_JOBS_REQUEST,
});

export const fetchJobsSuccess = (jobs) => ({
  type: FETCH_JOBS_SUCCESS,
  payload: jobs,
});

export const fetchJobsFailure = (error) => ({
  type: FETCH_JOBS_FAILURE,
  payload: error,
});
// Thunk Action

export const fetchAllJobs = (isEmployer) => {
  const apiFunction = isEmployer ? getEmployerJobs : getFreeLanceJobs;
  return async (dispatch) => {
    dispatch(fetchJobsRequest());
    try {
      const response = await apiFunction();

      dispatch(fetchJobsSuccess(response.data));
    } catch (error) {
      dispatch(fetchJobsFailure(error.message));
      toast.error("Failed to fetcch job. Please try again.", {
        position: "bottom-right",
        autoClose: 1000,
      });
    }
  };
};

export const postJob = (formData) => async (dispatch) => {
  dispatch(postJobRequest()); // Dispatch the request action first

  try {
    // Call the createJob API function
    const response = await createJob(formData);

    // If successful, dispatch the success action
    dispatch(postJobSuccess(response.data));

    // Show success toast
    toast.success("Job created successfully", {
      position: "bottom-right",
      autoClose: 1000,
    });
  } catch (error) {
    // If there's an error, dispatch failure action
    dispatch(postJobFailure(error));

    // Show error toast
    toast.error("Failed to create job. Please try again.", {
      position: "bottom-right",
      autoClose: 1000,
    });

    console.error("Error creating job:", error);
  }
};
