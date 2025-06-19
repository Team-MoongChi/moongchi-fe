import { Route } from "react-router-dom";

import GongguMainPage from "../../pages/gongguPages/GongguMainPage";
import GongguSearchPage from "../../pages/gongguPages/GongguSearchPage";
import GongguItemPage from "../../pages/gongguPages/GongguItemPage";
import GongguWritePage from "../../pages/gongguPages/GongguWritePage";
import GongguMapPage from "../../pages/gongguPages/GongguMapPage";

export default function GongguMainRoutes() {
  return (
    <>
      <Route path="/" element={<GongguMainPage />}></Route>
      <Route path="/gonggu/search" element={<GongguSearchPage />}></Route>
      <Route path="/gonggu/list/:gongguId" element={<GongguItemPage />}></Route>
      <Route path="/gonggu/write" element={<GongguWritePage />}></Route>
      <Route
        path="/gonggu/edit/:gongguId"
        element={<GongguWritePage />}
      ></Route>
      <Route path="/gonggu/map" element={<GongguMapPage />}></Route>
    </>
  );
}
