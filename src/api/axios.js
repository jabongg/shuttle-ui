import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // Base URL for the Spring Boot backend
    headers: {
        'Content-Type': 'application/json',
    },
});

// Example of a GET request
export const fetchData = async (endpoint) => {
    try {
        const response = await axiosInstance.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

// Example of a POST request
export const postData = async (endpoint, data) => {
    try {
        const response = await axiosInstance.post(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};

export default axiosInstance;