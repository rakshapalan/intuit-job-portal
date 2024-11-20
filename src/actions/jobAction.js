// actions/jobActions.js
import {
  createJob,
  getEmployerJobs,
  createUser,
  applyToJob,
  getFreeLanceJobs,
} from "../api/apiCompanies"; // import your existing createJob function
import { toast } from "react-toastify";
import {
  POST_JOB_FAILURE,
  POST_JOB_SUCCESS,
  POST_JOB_REQUEST,
  FETCH_JOBS_FAILURE,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_REQUEST,
  APPLY_JOBS_FAILURE,
  APPLY_JOBS_SUCCESS,
  APPLY_JOBS_REQUEST,
} from "./actionType";

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
export const applyToJobRequest = () => ({
  type: APPLY_JOBS_REQUEST,
});

export const applyToJobSuccess = (jobs) => ({
  type: APPLY_JOBS_SUCCESS,
  payload: jobs,
});

export const applyToJobFailure = (error) => ({
  type: APPLY_JOBS_FAILURE,
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

export const postJobUser = (formData, isEmployer) => async (dispatch) => {
  dispatch(postJobRequest()); // Dispatch the request action first
  const apiFunction = isEmployer ? createJob : createUser;
  try {
    // Call the createJob API function
    const response = await apiFunction(formData);
    dispatch(postJobSuccess(response?.data));
    // Show success toast
    toast.success(`${isEmployer ? "Job" : "Profile"} created successfully`, {
      position: "bottom-right",
      autoClose: 1000,
    });
  } catch (error) {
    // If there's an error, dispatch failure action
    dispatch(postJobFailure(error));

    // Show error toast
    toast.error("Failed to create. Please try again.", {
      position: "bottom-right",
      autoClose: 1000,
    });

    console.error("Error creating job:", error);
  }
};
export const applyToUserJob = (quickAppliedJobs) => async (dispatch) => {
  dispatch(applyToJobRequest()); // Dispatch the request action first

  try {
    // Call the createJob API function
    const response = await applyToJob({ jobIdList: quickAppliedJobs });
    dispatch(applyToJobSuccess(response?.data?.jobIdList));

    // Show success toast
    toast.success(
      `Applied to ${
        quickAppliedJobs.length > 1
          ? `${quickAppliedJobs?.length} jobs`
          : `${quickAppliedJobs?.length} job`
      }  successfully`,
      {
        position: "bottom-right",
        autoClose: 1000,
      }
    );
  } catch (error) {
    // If there's an error, dispatch failure action
    dispatch(applyToJobFailure(error));
    // Show error toast
    toast.error("Appplied to job failed. Please try again.", {
      position: "bottom-right",
      autoClose: 1000,
    });
  }
};
