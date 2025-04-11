import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Navigation from "../components/common/Navigation";
import { ADDUSER, DASHBOARD, HOME, PRODUCTDETAIL, SHOP, SIGNIN, USERS } from "../constants/routes";
import Home from "../views/home";
import Shop from "../views/shop";
import SignInView from "../views/sign-in";
import ProductDetail from "../views/product-detail";
import { NotFoundView } from "../views/not-found";
import Dashboard from "../views/admin/dashboard";
import { UserView } from "../views/admin/user";
import UserForm from "../views/admin/create-user";

export default function AppRouter() {
    const [products, setProducts] = useState([]);
    return (
        <Router>
            <Navigation setProducts={setProducts} />
            <Routes>
                <Route path={HOME} element={<Home products={products} />} />
                <Route path={PRODUCTDETAIL} element={<ProductDetail />} />
                <Route path={SHOP} element={<Shop />} />
                <Route path={SIGNIN} element={<SignInView />} />

                <Route path={DASHBOARD} element={<Dashboard />} />
                <Route path={USERS} element={<UserView />} />
                <Route path={ADDUSER} element={<UserForm />} />
            </Routes>
        </Router>
    );
}