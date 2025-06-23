import { Route } from "react-router-dom";

import ChatListPage from "../../pages/chatPages/ChatListPage";
import ChatPayPage from "../../pages/chatPages/ChatPayPage";
import AllReviewPage from "../../pages/chatPages/AllReviewPage";
import OneReviewPage from "../../pages/chatPages/OneReviewPage";
import ChatPage from "../../pages/chatPages/ChatPage";
import ChatPayResult from "../../pages/chatPages/ChatPayResult";

export default function ChatMainRoutes() {
  return (
    <>
      <Route path="/chat/list" element={<ChatListPage />}></Route>
      <Route path="/chat/list/:chatRoomId" element={<ChatPage />}></Route>
      <Route path="/chat/:chatRoomId/pay" element={<ChatPayPage />}></Route>
      <Route
        path="/chat/:chatRoomId/pay/result"
        element={<ChatPayResult />}
      ></Route>
      <Route
        path="/chat/:chatRoomId/review"
        element={<AllReviewPage />}
      ></Route>
      <Route
        path="/chat/:chatRoomId/review/:targetParticipantId"
        element={<OneReviewPage />}
      ></Route>
    </>
  );
}
