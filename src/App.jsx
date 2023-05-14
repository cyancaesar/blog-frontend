import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import Layout from "./layout/Layout";
import RequireAuth from "./components/RequireAuth";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AutoLogin from "./components/AutoLogin";
import Article from "./pages/Article";
import React from "react";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import Account from "./pages/Account";

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route element={<AutoLogin />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/blog">
                            <Route path="/blog" element={<Blog />} />
                            <Route path=":id" element={<Article />} />
                        </Route>
                        <Route path="/settings">
                            <Route index element={<Settings />} />
                            <Route path="account" element={<Account />} />
                        </Route>

                        <Route element={<RequireAuth allowedRole={["admin", "default"]} />}>
                            <Route path="/admin" element={<Admin />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
