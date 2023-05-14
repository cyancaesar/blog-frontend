import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import BlogCard from "../components/BlogCard";
import useAxios from "../hooks/useAxios";

const Blog = () => {

    const axios = useAxios();
    const [blog, setBlog] = useState([]);

    useEffect(() => {
        const fetchBlog = async () => {
            axios("/api/blog/").then(res => {
                if (res.status === 200) {
                    setBlog(res.data.message);
                }
            }).catch(() => {
                console.log("ERROR");
            });
        };
        fetchBlog();
    }, []);

    return (
        <Container component="main" maxWidth={false} sx={{ flexGrow: 1, py: 2 }}>
            <Container>
                <Grid container columnSpacing={2} rowSpacing={4}>
                    {blog && blog.map(item => {
                        return (
                            <Grid key={item._id} item sm={6}>
                                <BlogCard blog={item} />
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </Container>
    );
};

export default Blog;