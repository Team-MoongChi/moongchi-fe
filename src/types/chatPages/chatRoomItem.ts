interface Participant {
  participantId: number;
  userId: number;
  nickname: string;
  profileUrl: string;
  role: "LEADER" | "MEMBER";
  payStatement: "PAID" | "UNPAID";
  tradeCompleted: boolean;
  perPersonPrice: number;
  reviewed: boolean;
  me: boolean;
}
interface Message {
  id: string;
  participantId?: number;
  message: string;
  messageType: "SYSTEM" | "TEXT" | "IMAGE";
  sendAt: "string";
}

export interface ChatRoomItem {
  id: number;
  title: string;
  status: string;
  imgUrl: string;
  price: number;
  deadline: string;
  participants: Participant[];
  messages: Message[];
}
