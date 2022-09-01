import { useQuery } from "@apollo/client";
import styled from "styled-components";
import Line from "../../components/utilities/Line";
import { USER_THREADS } from "../../graphql/user";
import { useJwt } from "../../hooks/useJwt";
import { Thread as ThreadType } from "../../types/thread";
import Thread from "./Thread";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-right: 1rem;
  border-right: 0.125rem solid ${(props) => props.theme.fontDimmed};
`;

function Threads() {
  const { sub } = useJwt();
  const { data } = useQuery(USER_THREADS, { variables: { id: sub } });

  return (
    <Wrapper>
      <h3>Messaging</h3>
      <Line />
      {data &&
        data.user.threads.map((thread: ThreadType) => (
          <Thread
            key={thread.id}
            thread={thread}
          />
        ))}
    </Wrapper>
  );
}

export default Threads;
