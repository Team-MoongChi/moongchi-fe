export interface ChatRoom {
  id: number;
  title: string;
  status: string;
  participantCount: number;
  imgUrl: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}
