export const initialState = {
  loading: false,
  job: null,
  error: null,
};

export const jobReducer = (state = initialState, action) => {
  console.log("action", action?.type);
  switch (action.type) {
    case "POST_JOB_REQUEST":
      return { ...state, loading: true, error: null };
    case "POST_JOB_SUCCESS":
      return { ...state, loading: false, job: action.payload };
    case "POST_JOB_FAILURE":
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
