import { Box, Button, Container, Grid, TextField, Typography, Paper, Divider, Snackbar, Alert } from "@mui/material";
import Markdown from "markdown-to-jsx";
import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark as CodeStyle } from "react-syntax-highlighter/dist/esm/styles/prism";
import useAxios from "../hooks/useAxios";


const Admin = () => {

    const [title, setTitle] = useState("");
    const [md, setMd] = useState("");
    const [published, setPublished] = useState(false);
    const axios = useAxios();

    const publish = async () => {
        await axios.post("/api/blog", {
            title,
            content: md
        }, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(res => {
            if (res.status === 201) {
                setPublished(true);
                setTitle("");
                setMd("");
            }
        }).catch(err => {
            setPublished(false);
            console.log(err);
        });
    };

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

    return (
        <>
            <Container component="main" maxWidth={false} sx={{ py: 2, display: "flex", flexGrow: 1 }}>
                <Grid container justifyContent="center" alignContent="space-between" columnSpacing={4} rowSpacing={2}>

                    <Grid item sm={6}>
                        <Typography variant="h5" textTransform="uppercase">Editor</Typography>
                    </Grid>
                    <Grid item sm={6}>
                        <Typography variant="h5" textTransform="uppercase">Live Preview</Typography>
                    </Grid>

                    <Grid item sm={6}>
                        <Box component={Paper}>
                            <TextField fullWidth size="small" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Box>
                    </Grid>
                    <Grid item sm={6}></Grid>

                    {/* Editor */}
                    <Grid item sm={6}>
                        <Paper elevation={1}>
                            <TextField placeholder="Article in Markdown.." multiline minRows={30} fullWidth value={md} onChange={(e) => setMd(e.target.value)} />
                        </Paper>
                    </Grid>

                    {/* Preview */}
                    <Grid item sm={6}>
                        {md && (
                            <Paper elevation={1} sx={{ display: "flex", p: 2 }}>
                                <Markdown options={{
                                    overrides: {
                                        pre: PreBlock
                                    },
                                }}>{md}</Markdown>
                            </Paper>
                        )}
                    </Grid>

                    <Grid item sm={12}>
                        <Box display="flex" gap={2}>
                            <Button component="label" fullWidth variant="outlined" color="info">
                                Upload
                                <input hidden type="file" />
                            </Button>
                            <Divider flexItem orientation="vertical" />
                            <Button onClick={publish} fullWidth variant="outlined" color="success">Publish</Button>
                            <Divider flexItem orientation="vertical" />
                            <Button fullWidth variant="outlined" color="error">Cancel</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Snackbar anchorOrigin={{ horizontal: "right", vertical: "bottom" }} open={published} autoHideDuration={5000} onClose={() => setPublished(false)}>
                <Alert onClose={() => setPublished(false)} severity={"success"} sx={{ width: "100%" }}>
                    Article published successfully 😄
                </Alert>
            </Snackbar>
        </>
    );
};

export default Admin;