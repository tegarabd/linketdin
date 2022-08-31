import { useQuery } from "@apollo/client";
import { COMMENT_REPLIES } from "../../../../../graphql/comment";
import { Comment as CommentType } from "../../../../../types/comment";
import { Post } from "../../../../../types/post";
import Comment from "./Comment";

function Replies({ commentId, post }: { commentId: string; post: Post }) {
  const { data } = useQuery(COMMENT_REPLIES, {
    variables: { commentId, offset: 0, limit: 2 },
  });

  return (
    <>
      {data &&
        data.commentReplies.map((reply: CommentType) => (
          <Comment
            key={reply.id}
            comment={reply}
            post={post}
          />
        ))}
    </>
  );
}

export default Replies;
