import { Routes, Route } from "react-router-dom";

import GongguMainPage from "../../pages/gongguPages/GongguMainPage";
import GongguWritePage from "../../pages/gongguPages/GongguWritePage";
import GongguItemPage from "../../pages/gongguPages/GongguItemPage";

export default function GongguMainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<GongguMainPage />}></Route>
            <Route path="/gonggu/write" element={<GongguWritePage />}></Route>
            <Route path="/gonggu/list" element={<GongguItemPage />}></Route>
        </Routes>
    );
}