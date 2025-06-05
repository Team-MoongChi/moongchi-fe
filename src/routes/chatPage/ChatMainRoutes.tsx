import { Routes, Route } from "react-router-dom";

import ChatListPage from "../../pages/chatPages/ChatListPage";
import ChatPayPage from "../../pages/chatPages/ChatPayPage";
import AllReviewPage from "../../pages/chatPages/AllReviewPage";
import OneReviewPage from "../../pages/chatPages/OneReviewPage";

export default function ChatMainRoutes() {
  return (
    <Routes>
      <Route path="/chat/list" element={<ChatListPage />}></Route>
      <Route path="/chat/pay/:chatRoomId" element={<ChatPayPage />}></Route>
      <Route path="/chat/review" element={<AllReviewPage />}></Route>
      <Route path="/chat/review/write" element={<OneReviewPage />}></Route>
    </Routes>
  );
}
