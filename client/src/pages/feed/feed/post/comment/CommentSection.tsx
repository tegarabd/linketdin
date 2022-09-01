import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { POST_COMMENTS } from "../../../../../graphql/post";
import { Comment } from "../../../../../types/comment";
import { Post } from "../../../../../types/post";
import Comments from "./Comments";
import CreateComment from "./CreateComment";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

function CommentSection({ post }: { post: Post }) {
  const { data, fetchMore } = useQuery(POST_COMMENTS, {
    variables: {
      postId: post.id,
      offset: 0,
      limit: 2,
    },
  });

  return (
    <Wrapper>
      <CreateComment post={post} />
      {data && (
        <Comments
          post={post}
          entries={data.postComments}
          onLoadMore={() => {
            fetchMore({
              variables: {
                offset: data.postComments.length,
              },
              updateQuery(previousQueryResult, { fetchMoreResult }) {

                const sameData = previousQueryResult.postComments.some(
                  (prevComment: Comment) => {
                    return fetchMoreResult.postComments.some(
                      (newComment: Comment) => newComment.id === prevComment.id
                    );
                  }
                );

                if (sameData) {
                  return previousQueryResult;
                }

                return {
                  __typename: "postComments",
                  postComments: [
                    ...previousQueryResult.postComments,
                    ...fetchMoreResult.postComments,
                  ],
                };
              },
            });
          }}
        />
      )}
    </Wrapper>
  );
}

export default CommentSection;
