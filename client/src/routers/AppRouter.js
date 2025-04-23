import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "../components/common/Navigation";
import Home from "../views/home";
import Shop from "../views/shop";
import SignInView from "../views/sign-in";
import Dashboard from "../views/admin/dashboard";
import { DASHBOARD, HOME, PRODUCT_ADD, PRODUCT_DETAIL, PRODUCT_LIST, SHOP, SIGNIN } from "../constants/routes";
import AddProduct from "../views/admin/products/AddProduct";
import ListProducts from "../views/admin/products/ListProducts";
// import { ListUsers } from "../views/admin/users/ListUsers";
// import AddUser from "../views/admin/users/AddUser";
import { NotFoundView } from "../views/not-found";
import Footer from "../components/common/Footer";
import ProductDetail from "../views/product-detail";

export default function AppRouter() {
  const [products, setProducts] = useState([]);
  return (
    <Router>
      <Navigation setProducts={setProducts} />
      <Routes>
        <Route path={HOME} element={<Home products={products} />} />
        <Route path={PRODUCT_DETAIL} element={<ProductDetail />} />
        <Route path={SHOP} element={<Shop />} />
        <Route path={SIGNIN} element={<SignInView />} />

        <Route path={DASHBOARD} element={<Dashboard />} />
        {/* <Route path={USERS_LIST} element={<ListUsers />} />
        <Route path={USERS_ADD} element={<AddUser />} /> */}
        <Route path={PRODUCT_LIST} element={<ListProducts />} />
        <Route path={PRODUCT_ADD} element={<AddProduct />} />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
      <Footer />
    </Router>
  );
}
