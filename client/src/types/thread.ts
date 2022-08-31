import { Message } from "./message";
import { User } from "./user";

export type Thread = {
  id: string;
  user: User;
  with: User;
  messages: Array<Message>;
};
