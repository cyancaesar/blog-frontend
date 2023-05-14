import { Button, Container } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {

    const navigate = useNavigate();

    return (
        <Container sx={{flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Button onClick={() => navigate("/settings/account")} variant="outlined">Change Account Details</Button>
        </Container>
    );
};

export default Settings;