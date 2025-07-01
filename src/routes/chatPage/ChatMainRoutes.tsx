import { Route } from "react-router-dom";

import ChatListPage from "../../pages/chatPages/ChatListPage";
import ChatPayPage from "../../pages/chatPages/ChatPayPage";
import AllReviewPage from "../../pages/chatPages/AllReviewPage";
import OneReviewPage from "../../pages/chatPages/OneReviewPage";
import ChatPage from "../../pages/chatPages/ChatPage";
import ChatPayResult from "../../pages/chatPages/ChatPayResult";
import SocketConnect from "../../components/chatPages/chatPage/SocketConnect";

export default function ChatMainRoutes() {
  return (
    <>
      <Route path="/chat/list" element={<ChatListPage />}></Route>
      <Route path="/chat/:chatRoomId" element={<SocketConnect />}>
        <Route index element={<ChatPage />}></Route>
        <Route path="pay" element={<ChatPayPage />}></Route>
        <Route path="pay/result" element={<ChatPayResult />}></Route>
        <Route path="review" element={<AllReviewPage />}></Route>
        <Route
          path="review/:targetParticipantId"
          element={<OneReviewPage />}
        ></Route>
      </Route>
    </>
  );
}
