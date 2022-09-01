import { Message } from "./message";
import { User } from "./user";

export type Thread = {
  id: string;
  user: User;
  with: User;
  lastMessage: Message;
  messages: Array<Message>;
};
