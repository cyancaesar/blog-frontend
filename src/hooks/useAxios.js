import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useRefreshToken } from "./useRefreshToken";
import config from "../config";

const useAxios = () => {

    const { auth } = useAuth();
    const refresh = useRefreshToken();

    const axiosInstance = axios.create({
        baseURL: config.baseUrl,
        withCredentials: true
    });

    useEffect(() => {
        const reqInter = axiosInstance.interceptors.request.use((config) => {
            let accessToken = auth?.accessToken;
            if (accessToken)
                config.headers["Authorization"] = `Bearer ${accessToken}`;
            return config;
        });
        const resInter = axiosInstance.interceptors.response.use(
            (res) => res,
            async (err) => {
                if (!err?.response?.data?.message.toLowerCase().includes("jwt")) {
                    return Promise.reject(err);
                }
                const prevReq = err?.config;
                if (
                    err?.response?.status === 400 &&
                    !prevReq?.sent
                ) {
                    prevReq.sent = true;
                    const newToken = await refresh();
                    prevReq.headers["Authorization"] = `Bearer ${newToken}`;
                    return axios(prevReq);
                }
                return Promise.reject(err);
            }
        );

        return () => {
            axiosInstance.interceptors.request.eject(reqInter);
            axiosInstance.interceptors.response.eject(resInter);
        };
    }, [auth, refresh]);

    return axiosInstance;
};

export default useAxios;