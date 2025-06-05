import { BrowserRouter } from "react-router-dom";

import GongguMainRoutes from "./gongguPage/GongguMainRoutes";
import ChatMainRoutes from "./chatPage/ChatMainRoutes";
import ShoppingMainRoutes from "./shoppingPage/ShoppngMainRoutes";

export default function TotalRoutes() {
  return (
    <BrowserRouter>
      <GongguMainRoutes />
      <ChatMainRoutes />
      <ShoppingMainRoutes />
    </BrowserRouter>
  );
}
