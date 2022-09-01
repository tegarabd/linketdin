import { User } from "./user";

export type Message = {
  id: string;
  sender: User;
  text: string;
  imageUrl: string;
  createdAt: string;
};
