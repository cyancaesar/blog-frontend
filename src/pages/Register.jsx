import { Container, Box, Typography, Grid, Button, TextField, Avatar } from "@mui/material";
import React, { useState } from "react";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import useAxios from "../hooks/useAxios";
import { cyan } from "@mui/material/colors";

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const axios = useAxios();
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess("");
        setError("");
        axios.post("/api/user", { username, password })
            .then((res) => {
                setSuccess(res?.data?.message);
                setUsername("");
                setPassword("");
            })
            .catch((err) => {
                setError(err?.response?.data?.message);
            });
    };

    return (
        <Container sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box onSubmit={handleSubmit} component="form" sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", gap: 4, maxWidth: "500px", p: 6 }}>
                <Grid container rowSpacing={4}>
                    <Grid item xs={12}>
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Avatar sx={{ bgcolor: cyan[300] }} >
                                <VpnKeyIcon />
                            </Avatar>
                            <Typography variant="h2" m={2}>Register</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12} display="flex" justifyContent="center">
                        <TextField fullWidth label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="center">
                        <TextField fullWidth type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Grid>
                    <Grid item textAlign="center" xs={12}>
                        {error && <Typography variant="overline" color="error.light">{error}</Typography>}
                        {success && <Typography variant="overline" color="success.light">{success}</Typography>}
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="center">
                        <Button fullWidth size="medium" variant="contained" color="primary" type="submit">Register</Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Register;