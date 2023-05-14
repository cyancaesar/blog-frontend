import { Alert, Box, Button, Chip, Container, Divider, Grid, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import useAxios from "../hooks/useAxios";
import { Link } from "@mui/icons-material";
import useAuth from "../hooks/useAuth";

// useReducer later to handle the API message

const Account = () => {

    const fileRef = useRef(null);
    const [filename, setFilename] = useState("");
    const [password, setPassword] = useState("");
    const axios = useAxios();
    const [alert, setAlert] = useState({});
    const { setAuth } = useAuth();

    const handleFileUpload = (e) => {
        e.preventDefault();
        setAlert({});
        const formData = new FormData();
        formData.append("avatar", fileRef.current.files[0]);

        axios.post("/api/user/profile", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(() => {
            setAlert({ status: true, message: "Avatar Updated" });
            fileRef.current.value = null;
            setFilename("");
            setAuth(prev => { return { ...prev, updated: 1 }; });
        }).catch(() => {
            setAlert({ status: false, message: "Error while updating avatar" });
        });
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        setAlert({});

        axios.put("/api/user", { password })
            .then(res => {
                console.log(res);
                setAlert({ status: true, message: "Successfully reset password" });
            })
            .catch(err => {
                setAlert({ status: false, message: err?.response?.data?.message });
            });
    };

    return (
        <>
            <Container>
                <Typography variant="h3">Account Settings</Typography>
                <Grid container my={4} columnSpacing={4}>
                    <Grid item xs={6}>
                        <Divider>
                            <Chip label="Avatar" />
                        </Divider>
                        <Box onSubmit={handleFileUpload} component="form" encType="multipart/form-data" display="flex" alignItems="center" gap={2} m={2} flexDirection="column">
                            <Box display="flex" alignItems="center" gap={2}>
                                <IconButton color="primary" component="label" sx={{ textAlign: "center" }} >
                                    <Link />
                                    <input ref={fileRef} onChange={(e) => { setFilename(e.target.files[0].name); }} accept="image/*" hidden type="file" />
                                </IconButton>
                                <Typography flexGrow={1} variant="body1">{filename}</Typography>
                            </Box>
                            <Button type="submit" variant="contained" fullWidth>Upload</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Divider>
                            <Chip label="Password change" />
                        </Divider>
                        <Box onSubmit={handlePasswordChange} component="form" display="flex" alignItems="center" gap={2} m={2} flexDirection="column">
                            <TextField type="password" size="small" fullWidth label="New password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <Button fullWidth type="submit" variant="contained">Submit</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Snackbar open={!!Object.keys(alert).length} autoHideDuration={6000} onClose={() => setAlert("")}>
                <Alert severity={alert.status ? "success" : "error"}>{alert.message}</Alert>
            </Snackbar>
        </>
    );
};

export default Account;