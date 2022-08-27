import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { POST_COMMENTS } from "../../../../../graphql/post";
import { Comment as CommentType } from "../../../../../types/comment";
import Comment from "./Comment";
import Comments from "./Comments";
import CreateComment from "./CreateComment";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

function CommentSection({ postId }: { postId: string }) {
  const { data, fetchMore } = useQuery(POST_COMMENTS, {
    variables: {
      postId,
      limit: 2,
      offset: 0,
    },
  });

  return (
    <Wrapper>
      <CreateComment postId={postId} />
      {data && (
        <Comments
          postId={postId}
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
