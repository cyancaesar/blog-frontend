import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useRefreshToken } from "../hooks/useRefreshToken";

const AutoLogin = () => {

    const [loading, setLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        !auth?.accessToken ? verifyToken() : setLoading(false);
    }, []);

    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Outlet />
            )}
        </>
    );

};

export default AutoLogin;