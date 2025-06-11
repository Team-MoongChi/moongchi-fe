type BoardStatus = "OPEN" | "CLOSING_SOON" | "CLOSED" | "COMPLETED";
interface Participant {
  userId: number;
  profileUrl: string;
}
export interface GongguItem {
  id: number;
  title: string;
  price: number;
  location: string;
  boardStatus: BoardStatus;
  totalUsers: number;
  currentUsers: number;
  createAt: string;
  image: string;
  participants: Participant[];
}
