import { Box, Container, Paper, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
    return (
        <Box component="footer" sx={{ mt: "auto" }}>
            <Paper elevation={0} sx={{ borderRadius: 0, py: 1 }}>
                <Container maxWidth={false} sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Typography variant="caption">{`Baked by Cyan ${new Date().getFullYear()}`}</Typography>
                </Container>
            </Paper>
        </Box>
    );
};

export default Footer;