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

const getUserAPI = () => {
  const URL_API = "/v1/api/profile/user";
  return axios.get(URL_API);
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

export { createUserAPI, loginAPI, getUserAPI, getAccount, postGetOtp };
