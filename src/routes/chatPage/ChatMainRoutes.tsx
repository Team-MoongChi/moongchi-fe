import { Routes, Route } from "react-router-dom";

import ChatListPage from "../../pages/chatPages/chatListPage";

export default function ChatMainRoutes() {
    return (
        <Routes>
            <Route path="/chat/list" element={<ChatListPage />}></Route>
        </Routes>
    );
}