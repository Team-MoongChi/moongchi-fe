import { Route } from "react-router-dom";

import GongguMainPage from "../../pages/gongguPages/GongguMainPage";
import GongguWritePage from "../../pages/gongguPages/GongguWritePage";
import GongguMapPage from "../../pages/gongguPages/GongguMapPage";
import GongguItemPage from "../../pages/gongguPages/GongguItemPage";

export default function GongguMainRoutes() {
  return (
    <>
      <Route path="/" element={<GongguMainPage />}></Route>
      <Route path="/gonggu/write" element={<GongguWritePage />}></Route>
      <Route path="/gonggu/write/map" element={<GongguMapPage />}></Route>
      <Route path="/gonggu/list/:gongguId" element={<GongguItemPage />}></Route>
    </>
  );
}
