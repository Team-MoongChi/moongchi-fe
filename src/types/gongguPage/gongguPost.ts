type BoardStatus = "OPEN" | "CLOSING_SOON" | "CLOSED" | "COMPLETED";
interface Participant {
  userId: number;
  role: string;
  mannerLeader: number;
  profileUrl: string;
}
export interface GongguPost {
  id: number;
  title: string;
  price: number;
  content: string;
  location: string;
  boardStatus: BoardStatus;
  deadline: string;
  totalUsers: number;
  currentUsers: number;
  images: string[];
  participants: Participant;
}
