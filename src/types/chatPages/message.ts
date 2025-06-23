export interface Message {
  id?: number;
  participantId?: number | null;
  message: string;
  messageType: "TEXT" | "SYSTEM" | "ENTER";
  sendAt?: string;
  status?: string;
  chatStatus: string;
  buttonVisibleTo?: "LEADER" | "MEMBER" | "ALL";
  senderNickname: string;
  senderProfileUrl: string;
}
