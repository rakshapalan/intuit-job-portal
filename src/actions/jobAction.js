// actions/jobActions.js
import { createJob } from "../api/apiCompanies"; // import your existing createJob function
import { toast } from "react-toastify";

// Action Types
export const POST_JOB_REQUEST = "POST_JOB_REQUEST";
export const POST_JOB_SUCCESS = "POST_JOB_SUCCESS";
export const POST_JOB_FAILURE = "POST_JOB_FAILURE";

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

// Thunk Action
export const postJob = (formData) => async (dispatch) => {
  console.log("response");
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
