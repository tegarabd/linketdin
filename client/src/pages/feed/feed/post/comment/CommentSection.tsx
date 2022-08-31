import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { POST_COMMENTS } from "../../../../../graphql/post";
import { Comment as CommentType } from "../../../../../types/comment";
import { Post } from "../../../../../types/post";
import Comment from "./Comment";
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
      limit: 2,
      offset: 0,
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
            });
          }}
        />
      )}
    </Wrapper>
  );
}

export default CommentSection;
