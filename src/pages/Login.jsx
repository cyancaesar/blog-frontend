import { Box, Container, Grid, TextField, Typography, Button, Avatar, Checkbox, FormControlLabel } from "@mui/material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { cyan } from "@mui/material/colors";
import useAuth from "../hooks/useAuth";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import parseJwt from "../utils/parseJwt";

const Login = () => {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [remember, setRemember] = useState(false);
    const [success, setSuccess] = useState("");
    const [err, setErr] = useState("");

    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axios = useAxios();
    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSuccess("");
        setErr("");

        const data = {
            username: user,
            password: pass,
            remember
        };

        axios.post("/api/auth/login", data)
            .then((res) => {
                let accessToken = res.data.accessToken;
                let { username: user, role } = parseJwt(accessToken);
                setAuth({ user, role, accessToken });
                setSuccess(`Welcome ${user}`);
                setTimeout(() => navigate(from, { replace: true }), 2000);
            })
            .catch((err) => {
                setErr(err.response?.data?.message);
            });

    };
    return (
        <Container maxWidth={false} sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexGrow: 1 }}>
            <Box component="form" textAlign="center" onSubmit={handleSubmit} sx={{ maxWidth: "500px", p: 6, borderRadius: 3 }}>
                <Grid container spacing={4}>
                    <Grid item sm={12}>
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Avatar sx={{ bgcolor: cyan[500] }} >
                                <VpnKeyIcon />
                            </Avatar>
                            <Typography variant="h2" m={2}>Login</Typography>
                        </Box>
                    </Grid>
                    <Grid item sm={12}>
                        {success && <Typography variant="overline" color="success.light">{success}</Typography>}
                        {err && <Typography variant="overline" color="error.light">{err}</Typography>}
                    </Grid>
                    <Grid item sm={12}>
                        <TextField size="small" fullWidth type="text" variant="outlined" label="Username" value={user} onChange={(e) => setUser(e.target.value)} />
                    </Grid>
                    <Grid item sm={12}>
                        <TextField size="small" fullWidth type="password" variant="outlined" label="Password" value={pass} onChange={(e) => setPass(e.target.value)} />
                    </Grid>
                    <Grid item sm={12} textAlign="start">
                        <FormControlLabel onMouseDown={(e) => e.preventDefault()} control={<Checkbox />} label="Remember me?" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                    </Grid>
                    <Grid item sm={12}>
                        <Button fullWidth variant="contained" color="primary" type="submit">Login</Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Login;