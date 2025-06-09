// 타입 정의
type BoardStatus = "OPEN" | "CLOSING_SOON" | "CLOSED" | "COMPLETED";
interface Category {
  id: number;
  name: string;
  level: "LARGE" | "MEDIUM" | "SMALL";
  subCategories?: Category[];
}
interface ShopProduct {
  id: number;
  imgUrl: string;
  productUrl: string;
}
interface Product {
  id: number;
  name: string;
  price: number;
  quantity: string;
  images: string[];
  product?: ShopProduct;
  category: Category;
}
interface Participant {
  id: number;
  userId: number;
  name: string;
  role: "LEADER" | "MEMEBER";
}
export interface GongguItem {
  id: number;
  title: string;
  content: string;
  location: string;
  boardStatus: BoardStatus;
  deadline: string;
  totalUsers: number;
  currentUsers: number;
  groupProduct: Product;
  participants: Participant[];
}
