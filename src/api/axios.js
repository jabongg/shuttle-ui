// src/api/axios.js
import axios from "axios";

// Pick from env (local/prod)
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // backend URL from .env
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("API Base URL: " , axiosInstance.baseURL);

// Example of a GET request
export const fetchData = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Example of a POST request
export const postData = async (endpoint, data) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

export default axiosInstance;
