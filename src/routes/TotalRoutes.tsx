import { BrowserRouter, Routes } from "react-router-dom";

import GongguMainRoutes from "./gongguPage/GongguMainRoutes";
import ChatMainRoutes from "./chatPage/ChatMainRoutes";
import ShoppingMainRoutes from "./shoppingPage/ShoppngMainRoutes";
import StartMainRoutes from "./startPage/StartMainRoutes";

export default function TotalRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {GongguMainRoutes()}
        {ChatMainRoutes()}
        {ShoppingMainRoutes()}
        {StartMainRoutes()}
      </Routes>
    </BrowserRouter>
  );
}
