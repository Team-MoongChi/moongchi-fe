import { Route } from "react-router-dom";
import { useState } from "react";

import ChatListPage from "../../pages/chatPages/ChatListPage";
import ChatPayPage from "../../pages/chatPages/ChatPayPage";
import AllReviewPage from "../../pages/chatPages/AllReviewPage";
import OneReviewPage from "../../pages/chatPages/OneReviewPage";
import ChatPage from "../../pages/chatPages/ChatPage";
import ChatPayResult from "../../pages/chatPages/ChatPayResult";
import SocketConnect from "../../components/chatPages/chatPage/SocketConnect";

export default function ChatMainRoutes() {
  const [normalShutdown, setNormalShutdown] = useState<boolean>(false);
  const [isBack, setIsBack] = useState<boolean>(false);

  return (
    <>
      <Route
        path="/chat/list"
        element={
          <ChatListPage normalShutdown={normalShutdown} isBack={isBack} />
        }
      ></Route>
      <Route
        path="/chat/:chatRoomId"
        element={
          <SocketConnect
            setNormalShutdown={setNormalShutdown}
            setIsBack={setIsBack}
          />
        }
      >
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
