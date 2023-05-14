import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
    return (
        <Box sx={{
            minHeight: "100vh", display: "flex", flexDirection: "column",
        }}>
            <Header />
            <Outlet />
            <Footer />
        </Box>
    );
};
export default Layout;