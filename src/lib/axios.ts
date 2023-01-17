import axios from 'axios';

export const axiosIntanse = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json'
  }
});
