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
  const [postComments, { data }] = useLazyQuery(POST_COMMENTS);
  const [comments, setComments] = useState<Array<Comment>>([]);

  useEffect(() => {
    postComments({
      variables: {
        postId: post.id,
        limit: 2,
        offset: 0,
      },
    });
    return () => {};
  }, []);

  useEffect(() => {
    if (data) {
      setComments([...comments, ...data.postComments]);
    }
  }, [data]);

  return (
    <Wrapper>
      <CreateComment post={post} />
      {data && (
        <Comments
          post={post}
          entries={comments}
          onLoadMore={() => {
            postComments({
              variables: {
                postId: post.id,
                limit: 2,
                offset: comments.length,
              },
            });
          }}
        />
      )}
    </Wrapper>
  );
}

export default CommentSection;
