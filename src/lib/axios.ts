import axios from 'axios';

export const axiosIntanse = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosIntanse.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    console.error(err);
    return Promise.reject(err);
  }
);
