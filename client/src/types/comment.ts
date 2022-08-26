import { Post } from "./post";
import { User } from "./user";

export type Comment = {
  id: string;
  post: Post;
  commenter: User;
  text: string;
  likes: Array<User>;
  replies: Array<Comment>;
  createdAt: string;
};
