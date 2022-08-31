import { User } from "./user";

export type ConnectInvitation = {
  id: string;
  from: User;
  to: User;
  note: string;
  createdAt: string;
};
