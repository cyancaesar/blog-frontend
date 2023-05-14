import React from "react";
import useAuth from "../hooks/useAuth";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRole }) => {
    const location = useLocation();
    const { auth } = useAuth();
    return (
        auth?.user
            ? (
                allowedRole.includes(auth.role)
                    ? <Outlet />
                    : <Navigate to="/" state={{ from: location }} replace />
            )
            : <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;