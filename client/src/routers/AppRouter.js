import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Navigation from "../components/common/Navigation";
import { Home, Shop } from "../views";
import { HOME, SHOP } from "../constants/routes";

export default function AppRouter() {
    const [products, setProducts] = useState([]);
    return (
        <Router>
            <Navigation setProducts={setProducts} />
            <Routes>
                <Route path={HOME} element={<Home products={products} />} />
                <Route path={SHOP} element={<Shop />} />
            </Routes>
        </Router>
    );
}