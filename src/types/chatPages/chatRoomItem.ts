import type { Message } from "./message";

interface Participant {
  participantId: number;
  userId: number;
  nickname: string;
  profileUrl: string;
  role: "LEADER" | "MEMBER";
  payStatement: "PAID" | "UNPAID";
  joinAt: string;
  tradeCompleted: boolean;
  perPersonPrice: number;
  reviewed: boolean;
  me: boolean;
}
export interface ChatRoomItem {
  id: number;
  groupBoardId: number;
  title: string;
  status: string;
  imgUrl: string;
  price: number;
  deadline: string;
  location: string;
  participants: Participant[];
  messages: Message[];
}
