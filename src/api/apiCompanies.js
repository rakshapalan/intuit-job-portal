import {
  apiDelHelper,
  apiGetHelper,
  apiPostFormHelper,
  apiPostHelper,
  apiPutHelper,
} from "../utils/apiConfigHelper";
import {
  CREATE_JOB,
  GET_EMPLOYER_JOB_DETAILS,
  GET_FREELANCE_JOB_DETAILS,
  APPLY_TO_JOB,
  CREATE_USER,
  GET_ALL_JOBS,
} from "../constants/base";
export const getEmployerJobs = () => {
  const URL = `${GET_EMPLOYER_JOB_DETAILS}`;
  const response = apiGetHelper(URL);
  return response;
};

export const getFreeLanceJobs = (page = 1, limit = 10) => {
  const URL = `${GET_FREELANCE_JOB_DETAILS}`;
  const response = apiGetHelper(URL);
  return response;
};

export const getPaginatedJobs = ({ offset, limit }) => {
  const URL = `${GET_ALL_JOBS}`;
  const response = apiGetHelper(URL);
  return response;
};
export const createJob = (payload) => {
  const URL = `${CREATE_JOB}`;
  const response = apiPostFormHelper(URL, payload);
  return response;
};
export const createUser = (payload) => {
  const URL = `${CREATE_USER}`;
  const response = apiPostFormHelper(URL, payload);
  return response;
};
export const applyToJob = (payload) => {
  const URL = `${APPLY_TO_JOB}`;
  const response = apiPostFormHelper(URL, payload);
  return response;
};
export const gitHubValidation = (gitHubUsername) => {
  const URL = `https://api.github.com/users/${gitHubUsername}/repos`;
  const response = apiGetHelper(URL);
  return response;
};
//   export const getAttributeByRule = (teamId, jobType) => {
//     const URL = `${DOMAIN}`
//     const response = apiGetHelper(URL)
//     return response
//   }
