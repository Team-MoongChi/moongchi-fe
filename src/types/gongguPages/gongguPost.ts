type BoardStatus = "OPEN" | "CLOSING_SOON" | "CLOSED" | "COMPLETED";
type Role = "LEADER" | "MEMBER";

interface Participant {
  userId: number;
  nickname: string;
  profileUrl: string;
  mannerLeader: number;
  role: Role;
}
export interface GongguPost {
  id: number;
  title: string;
  price: number;
  content: string;
  location: string;
  boardStatus: BoardStatus;
  deadline: string;
  totalUser: number;
  currentUsers: number;
  productUrl?: string;
  likeCount: number;
  editable: boolean;
  chatRoomId: number;
  images: string[];
  participants: Participant[];
}
