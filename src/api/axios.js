import axios from "axios";
import config from "./../config";

const axiosInstance = axios.create({
    baseURL: config.baseUrl
});

export const axiosPrivate = axios.create({
    baseURL: config.baseUrl,
    withCredentials: true
});

export default axiosInstance;