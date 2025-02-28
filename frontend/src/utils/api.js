import axios from "./axios.customize";

const createUserAPI = (name, email, password) => {
  const URL_API = "/v1/api/profile/register";
  const data = { name, email, password };
  return axios.post(URL_API, data);
};

const loginAPI = (email, password) => {
  const URL_API = "/v1/api/profile/login";
  const data = { email, password };
  return axios.post(URL_API, data);
};

const getAccount = () => {
  const URL_API = "/v1/api/profile/account";
  return axios.get(URL_API);
};

const postGetOtp = (email) => {
  const URL_API = "/v1/api/profile/forgot";
  const data = { email };
  return axios.post(URL_API, data);
};

const postOTP = (email, otp) => {
  const URL_API = "/v1/api/profile/forgot/otp";
  const data = { email, otp };
  return axios.post(URL_API, data);
};

const postResetPassword = (password) => {
  const URL_API = "/v1/api/profile/forgot/reset";
  const data = { password };
  return axios.post(URL_API, data);
};

const getWatchList = () => {
  const URL_API = "/v1/api/profile/watch-list";
  return axios.get(URL_API);
};

export {
  postResetPassword,
  createUserAPI,
  loginAPI,
  getAccount,
  postGetOtp,
  postOTP,
  getWatchList,
};
