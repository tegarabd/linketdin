import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProfileName from "../../components/profile/ProfileName";
import Line from "../../components/utilities/Line";
import { THREAD } from "../../graphql/thread";
import { USER_PROFILE } from "../../graphql/user";
import { useJwt } from "../../hooks/useJwt";
import { Message as MessageType } from "../../types/message";
import { Thread } from "../../types/thread";
import CreateMessage from "./CreateMessage";
import Message from "./Message";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MessageSection = styled(Content)`
  height: 35rem;
  overflow-y: auto;
  margin-bottom: 1rem;
`;

function With({ thread }: { thread: Thread }) {
  const { sub } = useJwt();
  const withId = thread.user.id === sub ? thread.with.id : thread.user.id;
  const { data } = useQuery(USER_PROFILE, { variables: { id: withId } });

  if (data) {
    return (
      <h3>
        {data.user.firstName} {data.user.lastName}
      </h3>
    );
  }

  return <h3></h3>;
}

function Messages() {
  const { threadId } = useParams();
  const { data } = useQuery(THREAD, {
    variables: { threadId },
    skip: threadId == undefined,
    pollInterval: 1000,
  });

  return (
    <Wrapper>
      {threadId ? (
        <>
          <Content>
            {data && <With thread={data.thread} />}
            <Line />
            <MessageSection>
              {data &&
                data.thread.messages.map((message: MessageType) => (
                  <Message
                    key={message.id}
                    message={message}
                  />
                ))}
            </MessageSection>
          </Content>
          <CreateMessage />
        </>
      ) : (
        <Content>
          <h3>No selected thread</h3>
          <Line />
        </Content>
      )}
    </Wrapper>
  );
}

export default Messages;
