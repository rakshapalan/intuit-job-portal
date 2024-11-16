export const initialState = {
  isloading: false,
  job: null,
  error: null,
};

export const jobReducer = (state = initialState, action) => {
  console.log("action", action.payload);
  switch (action.type) {
    case "POST_JOB_REQUEST":
      return { ...state, isloading: true, error: null };
    case "POST_JOB_SUCCESS":
      return {
        ...state,
        isloading: false,
        job: action.payload,
        status: "SUCCESS",
      };
    case "POST_JOB_FAILURE":
      return {
        ...state,
        isloading: false,
        error: action.error,
        status: "ERROR",
      };
    case "FETCH_JOBS_REQUEST":
      return { ...state, isloading: true };
    case "FETCH_JOBS_SUCCESS":
      return { ...state, isloading: false, job: action?.payload?.jobDetails };
    case "FETCH_JOBS_FAILURE":
      return { ...state, isloading: false, error: action.payload };
    default:
      return state;
  }
};
