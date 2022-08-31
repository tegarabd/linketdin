import { User } from "./user";

export type Notification = {
  id: string;
  from: User;
  to: User;
  text: string;
  createdAt: string;
};
