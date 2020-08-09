import axios from 'axios';

const Error = {
  UNAUTHORIZED: 401,
};

const SERVER = `https://4.react.pages.academy/six-cities`;
const TIMEOUT = 5000;

export const createAPI = (onUnauthorized, onLoadDataErr, resetErr) => {
  const api = axios.create({
    baseURL: SERVER,
    timeout: TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    resetErr();
    return response;
  };

  const onFail = (err) => {
    if (err.response.status === Error.UNAUTHORIZED) {
      onUnauthorized();
      throw err;
    }
    onLoadDataErr(`${err.response.data.error} ${err.message}`);
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
