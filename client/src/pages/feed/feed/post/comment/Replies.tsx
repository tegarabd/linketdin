import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import ButtonTertiary from "../../../../../components/utilities/button/ButtonTertiary";
import { COMMENT_REPLIES } from "../../../../../graphql/comment";
import { Comment as CommentType } from "../../../../../types/comment";
import { Post } from "../../../../../types/post";
import Comment from "./Comment";

function Replies({ commentId, post }: { commentId: string; post: Post }) {
  const { data, fetchMore } = useQuery(COMMENT_REPLIES, {
    variables: {
      commentId,
      limit: 2,
      offset: 0,
    },
  });

  const [show, setShow] = useState(false);

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
              {data.commentReplies.map((reply: CommentType) => (
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
                    fetchMore({
                      variables: {
                        offset: data.commentReplies.length,
                      },
                      updateQuery(previousQueryResult, { fetchMoreResult }) {
                        const sameData =
                          previousQueryResult.commentReplies.some(
                            (prevComment: CommentType) => {
                              return fetchMoreResult.commentReplies.some(
                                (newComment: CommentType) =>
                                  newComment.id === prevComment.id
                              );
                            }
                          );

                        if (sameData) {
                          return previousQueryResult;
                        }

                        return {
                          __typename: "commentReplies",
                          commentReplies: [
                            ...previousQueryResult.commentReplies,
                            ...fetchMoreResult.commentReplies,
                          ],
                        };
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
