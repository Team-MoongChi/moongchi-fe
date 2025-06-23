import { Route } from "react-router-dom";

import ShopItemPage from "../../pages/shoppingPages/ShopItemPage";
import ShopMainPage from "../../pages/shoppingPages/ShopMainPage";
import ShopResultPage from "../../pages/shoppingPages/ShopResultPage";
import ShopChatbotPage from "../../pages/shoppingPages/ShopChatbotPage";

export default function ShoppingMainRoutes() {
  return (
    <>
      <Route path="/shopping" element={<ShopMainPage />}></Route>
      <Route path="/shopping/result" element={<ShopResultPage />}></Route>
      <Route path="/shopping/item" element={<ShopItemPage />}></Route>
      <Route path="/shopping/chatbot" element={<ShopChatbotPage />}></Route>
    </>
  );
}
