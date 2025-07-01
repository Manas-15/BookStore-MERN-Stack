import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

// Create a separate instance for form-urlencoded requests
export const formInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

export const fileUpload = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_API_URL,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

export const timeLog = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_API_URL_TIMELOG,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default instance;
