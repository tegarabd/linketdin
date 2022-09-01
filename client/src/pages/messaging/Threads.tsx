import { useQuery } from "@apollo/client";
import styled from "styled-components";
import Line from "../../components/utilities/Line";
import { USER_THREADS } from "../../graphql/user";
import { useJwt } from "../../hooks/useJwt";
import { Thread as ThreadType } from "../../types/thread";
import Thread from "./Thread";
import { ReactComponent as CreateIcon } from "../../assets/create-icon.svg";
import ButtonTertiary from "../../components/utilities/button/ButtonTertiary";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-right: 1rem;
  border-right: 0.125rem solid ${(props) => props.theme.fontDimmed};
`;

const Upper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Threads() {
  const { sub } = useJwt();
  const { data } = useQuery(USER_THREADS, { variables: { id: sub } });
  const navigate = useNavigate();

  const create = () => {
    navigate("/messaging/thread/new");
  };

  return (
    <Wrapper>
      <Upper>
        <h3>Messaging</h3>
        <ButtonTertiary onClick={create}>
          <CreateIcon />
        </ButtonTertiary>
      </Upper>
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
