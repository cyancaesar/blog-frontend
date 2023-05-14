import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, CardMedia, Avatar, Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import useAxios from "../hooks/useAxios";
import config from "../config";


const BlogCard = ({ blog }) => {

    const bannerStyle = () => ({
    });
    const CustomCardMedia = styled(CardMedia)(bannerStyle);
    const navigate = useNavigate();
    const axios = useAxios();
    const { _id, title, author, created_ts: ts } = blog;
    const [avatar, setAvatar] = useState("");
    const view = () => {
        navigate(`/blog/${_id}`);
    };

    useEffect(() => {
        axios.get(`/api/user/profile/${author}`)
            .then(res => {
                setAvatar(`${config.baseUrl}/uploads/avatars/${res.data.message.avatar}`);
            })
            .catch(() => {
                setAvatar("");
            });
    }, []);

    return (
        <Card sx={{ height: "100%" }}>
            <CustomCardMedia sx={{ height: 140 }} image="https://picsum.photos/200"  />
            <CardContent>
                <Typography variant="h5" pb={1}>{title}</Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Avatar src={avatar} />
                            <Box display="flex" flexDirection="column">
                                <Typography variant="subtitle1">{author}</Typography>
                                <Typography color="text.secondary" variant="caption">{new Date(ts).toLocaleDateString()}</Typography>
                            </Box>
                        </Box>
                        <Button size="large" onClick={view} variant="contained">read</Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default BlogCard;