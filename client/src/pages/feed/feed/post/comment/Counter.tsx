import { useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";
import { COMMENT, LIKE_COMMENT } from "../../../../../graphql/comment";
import { useJwt } from "../../../../../hooks/useJwt";

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.7rem;
  font-weight: 600;
`;

const Button = styled.button`
  background-color: transparent;
  cursor: pointer;
  text-align: left;
`;

function Counter({
  commentId,
  onReplyButtonClicked,
}: {
  commentId: string;
  onReplyButtonClicked: VoidFunction;
}) {
  const { data } = useQuery(COMMENT, { variables: { commentId } });
  const { sub } = useJwt();
  const [likeComment] = useMutation(LIKE_COMMENT, {
    refetchQueries: [{ query: COMMENT, variables: { commentId } }],
  });

  const like = () => {
    likeComment({
      variables: {
        input: {
          likerId: sub,
          commentId,
        },
      },
    });
  };

  return (
    <ButtonGroup>
      <Button onClick={like}>Like {data && data.comment.likes.length}</Button>|
      <Button onClick={onReplyButtonClicked}>
        Replies {data && data.comment.replies.length}
      </Button>
    </ButtonGroup>
  );
}

export default Counter;
