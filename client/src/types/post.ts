import { Comment } from "./comment";
import { Tag } from "./tag";
import { User } from "./user";

export type Post = {
  id: string;
  poster: User;
  text: string;
  photoUrl: string;
  videoUrl: string;
  comments: Array<Comment>;
  sends: Array<User>;
  likes: Array<User>;
  tags: Array<Tag>;
  createdAt: string;
};
