import { Container, Typography } from "@mui/material";
import React from "react";

const NotFound = () => {
    return (
        <Container sx={{ p: 2 }}>
            <Typography textAlign="center" variant="h2">PAGE NOT FOUND</Typography>
        </Container>
    );
};

export default NotFound;