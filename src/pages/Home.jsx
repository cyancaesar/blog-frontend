import { Container, Grid, Box, Button, Typography, List, ListItem } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { DeveloperBoard } from "@mui/icons-material";
import config from "../config";

const Home = () => {

    const navigate = useNavigate();

    console.log(config);
    return (
        <Container component="main" sx={{ flexGrow: 1, py: 2, display: "flex", alignItems: "center" }}>
            <Grid container justifyContent="center" alignItems="center" columnSpacing={4} rowSpacing={8}>
                <Grid item sm={4}>
                    <Box>
                        <Typography variant="h2">Hey</Typography>
                        <Typography display="inline" mr={2} variant="h2">I&apos;m</Typography>
                        <Typography display="inline-block" color="primary.main" variant="h2">Caesar</Typography>
                    </Box>
                </Grid>

                <Grid item sm={4}>
                    <List>
                        <ListItem>
                            <DeveloperBoard />
                            <Typography variant="h6" px={1}>Software Developer</Typography>
                        </ListItem>
                        <ListItem>
                            <DeveloperBoard />
                            <Typography variant="h6" px={1}><a style={{
                                color: "inherit"
                            }} href="https://youtu.be/uykwqCrLVPU?t=2">Pentester</a></Typography>
                            <Typography variant="subtitle1">👈 Click me</Typography>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item sm={12}>
                    <Box textAlign="center">
                        <Typography variant="overline">
                            Software Engineers - Architects and builders of the digital world
                        </Typography>
                    </Box>
                </Grid>

                <Grid item sm={12}>
                    <Box textAlign="center">
                        <Button variant="contained" color="info" onClick={(e) => navigate("/blog")}>Explore the blog</Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;