import { useQuery } from "@apollo/client";
import { COMMENT_REPLIES } from "../../../../../graphql/comment";
import { Comment as CommentType } from "../../../../../types/comment";
import Comment from "./Comment";

function Replies({ commentId, postId }: { commentId: string; postId: string }) {
  const { data } = useQuery(COMMENT_REPLIES, {
    variables: { commentId, offset: 0, limit: 2 },
  });

  return (
    <>
      {data &&
        data.commentReplies.map((reply: CommentType) => (
          <Comment key={reply.id} comment={reply} postId={postId} />
        ))}
    </>
  );
}

export default Replies;
