import { BrowserRouter } from "react-router-dom";

import GongguMainRoutes from "./gongguPage/GongguMainRoutes";
import ChatMainRoutes from "./chatPage/ChatMainRoutes";

export default function TotalRoutes() {
    return (
        <BrowserRouter>
            <GongguMainRoutes />
            <ChatMainRoutes />
        </BrowserRouter>
    );
}