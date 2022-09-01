import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import ButtonTertiary from "../../../../../components/utilities/button/ButtonTertiary";
import { COMMENT_REPLIES } from "../../../../../graphql/comment";
import { Comment as CommentType } from "../../../../../types/comment";
import { Post } from "../../../../../types/post";
import Comment from "./Comment";

function Replies({ commentId, post }: { commentId: string; post: Post }) {
  const [commentReplies, { data }] = useLazyQuery(COMMENT_REPLIES);

  const [show, setShow] = useState(false);
  const [replies, setReplies] = useState<Array<CommentType>>([]);

  useEffect(() => {
    commentReplies({
      variables: { commentId, offset: 0, limit: 2 },
    });

    return () => {};
  }, []);

  useEffect(() => {
    if (data) {
      setReplies([...replies, ...data.commentReplies]);
    }

    return () => {};
  }, [data]);

  const showReply = () => {
    setShow(true);
  };

  return (
    <>
      {data && data.commentReplies.length > 0 ? (
        <>
          {!show && (
            <div>
              <ButtonTertiary
                size="small"
                onClick={showReply}
              >
                Show reply
              </ButtonTertiary>
            </div>
          )}
          {show && (
            <>
              {replies.map((reply: CommentType) => (
                <Comment
                  key={reply.id}
                  comment={reply}
                  post={post}
                />
              ))}
              <div>
                <ButtonTertiary
                  size="small"
                  onClick={() => {
                    setShow(false);
                    commentReplies({
                      variables: {
                        commentId,
                        offset: replies.length,
                        limit: 2,
                      },
                    });
                  }}
                >
                  Load more replies
                </ButtonTertiary>
              </div>
            </>
          )}
        </>
      ) : null}
    </>
  );
}

export default Replies;
