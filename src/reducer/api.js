import axios from 'axios';
import {ErrorCode} from '../const';

const SERVER = `https://4.react.pages.academy/six-cities`;
const TIMEOUT = 5000;

export const createAPI = (onUnauthorized, onLoadDataErr) => {
  const api = axios.create({
    baseURL: SERVER,
    timeout: TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    if (err.response && err.response.status === ErrorCode.UNAUTHORIZED) {
      onUnauthorized();
      throw err;
    }
    const errStatus = err.response ? err.response.data.error : ``;
    onLoadDataErr(`${errStatus} ${err.message}`);
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
