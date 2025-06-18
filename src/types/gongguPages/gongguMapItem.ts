type BoardStatus = "OPEN" | "CLOSING_SOON" | "CLOSED" | "COMPLETED";
interface Participant {
  userId: number;
  nickname: string;
  profileUrl: string;
  mannerLeader: number;
  role: "LEADER" | "MEMBER";
}
export interface GongguMapItem {
  id: number;
  title: string;
  price: number;
  location: string;
  boardStatus: BoardStatus;
  totalUsers: number;
  currentUsers: number;
  createAt: string;
  image: string;
  largeCategoryId: number;
  latitude: number;
  longitude: number;
  participants: Participant[];
}
