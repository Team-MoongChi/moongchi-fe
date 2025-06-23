import type { Message } from "./message";

export interface ChatConnectProps {
  chatRoomId: number | string;
  groupBoardId: number | string;
  participantId: number;
  token: string;
  role: "LEADER" | "MEMBER";
  initialMessages: Message[];
  initialStatus: string;
  participantMap: Map<number, { nickname: string; profileUrl: string }>;
}
