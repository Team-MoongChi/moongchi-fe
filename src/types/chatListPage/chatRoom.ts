export interface ChatRoom {
  chatRoomId: number;
  title: string;
  status: string;
  participantCount: number;
  imgUrl: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}
