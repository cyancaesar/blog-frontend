import { Avatar, Box, Container, Divider, Grid, Skeleton, Typography } from "@mui/material";
import Markdown from "markdown-to-jsx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark as CodeStyle } from "react-syntax-highlighter/dist/esm/styles/prism";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import config from "../config";

const Article = () => {

    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const [found, setFound] = useState(false);
    const [avatar, setAvatar] = useState("");
    const param = useParams();
    const axios = useAxios();

    useEffect(() => {
        setLoading(true);
        const getArticle = async () => {
            axios.get(`/api/blog/${param.id}`).then(res => {
                if (res?.status === 200) {
                    console.log(res.data);
                    setTitle(res.data.message.title);
                    setAuthor(res.data.message.author);
                    setDate(dayjs(Number(res.data.message.created_ts)).format("MMMM D, YYYY"));
                    setContent(res.data.message.content);
                    setFound(true);
                    // fetch avatar
                    axios.get(`/api/user/profile/${res.data.message.author}`)
                        .then(res => {
                            setAvatar(`${config.baseUrl}/uploads/avatars/${res.data.message.avatar}`);
                        })
                        .catch(() => {
                            setAvatar("");
                        });
                }
                else if (res?.status === 404) {
                    setFound(false);
                }
            }).catch(err => {
                console.error(err);
            });
            setLoading(false);
        };
        getArticle();
    }, []);

    // https://stackoverflow.com/questions/65807962/how-to-apply-code-highlights-within-markdown-to-jsx-package-in-react
    const CodeBlock = ({ className, children }) => {
        let lang = "text"; // default monospaced text
        if (className && className.startsWith("lang-")) {
            lang = className.replace("lang-", "");
        }
        return (
            <SyntaxHighlighter language={lang} style={CodeStyle}>
                {children}
            </SyntaxHighlighter>
        );
    };

    const PreBlock = ({ children, ...rest }) => {
        if ("type" in children && children["type"] === "code") {
            return CodeBlock(children["props"]);
        }
        return <pre {...rest}>{children}</pre>;
    };

    const loadingSkeleton = (
        <Container sx={{ display: "flex", justifyContent: "center" }}>
            <Skeleton variant="rectangular" animation="wave" width={"100%"} height={250} />
        </Container>
    );

    return (
        <>
            {loading ? (
                loadingSkeleton
            ) : !found ? (
                <Typography variant="h5">Not Found</Typography>
            ) : (
                <Grid container rowSpacing={2}>
                    <Grid item xs={12}>
                        <Typography textAlign="center" variant="h1">{title}</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Container sx={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
                                <Avatar src={avatar} />
                                <Typography variant="body1">{author}</Typography>
                            </Box>
                            <Typography variant="body1">{date}</Typography>
                        </Container>
                    </Grid>
                    <Grid item xs={12}>
                        <Container>
                            <Divider />
                        </Container>
                    </Grid>
                    <Grid item xs={12}>
                        <Container sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Markdown options={{
                                overrides: {
                                    pre: PreBlock
                                }
                            }}>{content}</Markdown>
                        </Container>
                    </Grid>
                </Grid>
            )
            }
        </>
    );
};

export default Article;