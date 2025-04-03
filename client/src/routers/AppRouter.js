import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Navigation from "../components/common/Navigation";
import { Home, Shop } from "../views";
import { HOME, SHOP } from "../constants/routes";

export default function AppRouter() {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path={HOME} element={<Home />} />
                <Route path={SHOP} element={<Shop />} />
            </Routes>
        </Router>
    );
}