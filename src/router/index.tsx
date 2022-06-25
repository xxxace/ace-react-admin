import { Routes, Route, BrowserRouter, Navigate, useLocation } from "react-router-dom";
import { isLogin } from "@/utils/auth";
import Layout from "@/components/Layout";
import Login from "@/views/login";
import Workplace from "@/views/workplace";
import Form from "@/views/form";
import { useEffect } from "react";


function AuthWrapper({ children }: { children: JSX.Element; }) {
    if (!isLogin()) {
        let location = useLocation();
        return <Navigate to="/login" state={{ from: location }} replace={true} />
    }
    return children
}

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<AuthWrapper><Workplace /></AuthWrapper>}></Route>
                    <Route path="/form" element={<AuthWrapper><Form /></AuthWrapper>}></Route>
                </Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;