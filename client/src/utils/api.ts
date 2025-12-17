// src/utils/api.ts
import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: 'https://collab-task-manager-qcow.onrender.com/api', // CHECK: Make sure this matches your Backend port!
  withCredentials: true, // Important for cookies
});

// A helper for SWR (data fetching)
export const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default api;