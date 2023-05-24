import { AppBar, Toolbar, Typography, Box, IconButton, Button, Avatar, Menu, MenuItem, ListItemIcon, BottomNavigation, BottomNavigationAction } from "@mui/material";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { useNavigate, useLocation, Link } from "react-router-dom";
// import { AdminPanelSettings, Article, Home, Logout, Settings } from "@mui/icons-material";
import AdminPanelSettings from "@mui/icons-material/AdminPanelSettings";
import Article from "@mui/icons-material/Article";
import Home from "@mui/icons-material/Home";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import config from "../config";

const Header = () => {

    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const axios = useAxios();
    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        if (!auth?.user)
            return;
        axios.get(`/api/user/profile/${auth?.user}`)
            .then(res => {
                setAvatar(`${config.baseUrl}/uploads/avatars/${res.data.message.avatar}`);
            })
            .catch(() => {
                setAvatar("");
            });
    }, [auth]);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const login = () => {
        navigate("/login");
    };

    const register = () => {
        navigate("/register");
    };

    const logout = () => {
        axios.post("/api/auth/logout")
            .then(res => {
                console.log(res.data);
                setAuth({});
                navigate(from);
            })
            .catch(err => {
                setAuth({});
                console.log(err);
            });
    };

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const nav = (
        <>
            <Box component="nav" display="flex" alignItems="center" gap={0}>
                <BottomNavigation
                    showLabels
                    value={location.pathname}
                >
                    <BottomNavigationAction value="/" component={Link} to="/" label="Home" icon={<Home />} />
                    <BottomNavigationAction value="/blog" component={Link} to="/blog" label="Blog" icon={<Article />} />
                    <BottomNavigationAction value="/admin" component={Link} to="/admin" label="Admin" icon={<AdminPanelSettings />} />
                </BottomNavigation>
                <IconButton size="large" onClick={handleClick}>
                    {/* <AccountCircleIcon fontSize="large" /> */}
                    <Avatar src={avatar} />
                </IconButton>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                PaperProps={{
                    elevation: 1
                }}
            >
                <MenuItem onClick={() => navigate("/settings")}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );

    return (
        <>
            <AppBar sx={{ py: 1 }} position="static" color="transparent" elevation={0} >
                <Toolbar variant="dense">
                    <Box onClick={() => navigate("/")} sx={{ display: "flex", flexGrow: 1, alignItems: "center", cursor: "pointer" }}>
                        {/* <AutoAwesomeIcon color="primary" /> */}
                        <Box component="img"
                            sx={{
                                height: 30,
                                maxHeight: { xs: 233, md: 167 },
                                maxWidth: { xs: 350, md: 250 }
                            }}
                            src={"/static/BASED.png"}
                        />
                        <Typography variant="h6" component="div">
                            Caesar
                        </Typography>
                    </Box>
                    {
                        auth?.user
                            ? nav
                            : (
                                <>
                                    <Button onClick={register} color="inherit">Register</Button>
                                    <Button onClick={login} color="inherit">Login</Button>
                                </>
                            )
                    }

                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;
