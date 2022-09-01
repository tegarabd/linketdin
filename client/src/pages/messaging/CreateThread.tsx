import { useMutation, useQuery } from "@apollo/client";
import React, { ChangeEventHandler, useState } from "react";
import styled from "styled-components";
import Input from "../../components/form/Input";
import ProfileName from "../../components/profile/ProfileName";
import ProfilePhoto from "../../components/profile/profilePhoto/ProfilePhoto";
import Line from "../../components/utilities/Line";
import { SEARCH_CONNECTED_USER, USER_THREADS } from "../../graphql/user";
import { useJwt } from "../../hooks/useJwt";
import { User } from "../../types/user";
import CreateMessage from "./CreateMessage";
import { Thread } from "../../types/thread";
import { useNavigate } from "react-router-dom";
import { CREATE_THREAD } from "../../graphql/thread";

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

const Profile = styled.div`
  display: flex;
  gap: 0.5rem;
  cursor: pointer;
`;

function CreateThread() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { sub } = useJwt();
  const { data: userThreads } = useQuery(USER_THREADS, {
    variables: { id: sub },
  });
  const { data, fetchMore } = useQuery(SEARCH_CONNECTED_USER, {
    variables: {
      userId: sub,
      query,
    },
    skip: query === "",
  });
  const [create] = useMutation(CREATE_THREAD, {
    refetchQueries: [{ query: USER_THREADS, variables: { id: sub } }],
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setQuery(event.target.value);
    fetchMore({
      variables: {
        query,
      },
      updateQuery({ fetchMoreResult }) {
        return fetchMoreResult;
      },
    });
  };

  const handleSelectProfile = (userId: string) => {
    userThreads.user.threads.forEach((thread: Thread) => {
      if (thread.with.id === userId || thread.user.id === userId) {
        navigate(`/messaging/thread/${thread.id}`);
        return;
      }
    });

    create({
      variables: {
        input: {
          userId: sub,
          withUserId: userId
        }
      }
    })
  };

  return (
    <Wrapper>
      <Content>
        <h3>Create Thread</h3>
        <Line />
        <Input
          type="search"
          value={query}
          onChange={handleChange}
          placeholder="Type a name"
        />
        {data &&
          data.searchConnectedUser.map((user: User) => (
            <Profile
              onClick={() => handleSelectProfile(user.id)}
              key={user.id}
            >
              <ProfilePhoto
                user={user}
                size="large"
              />
              <ProfileName
                user={user}
                withHeadline
                headlineLimit
              />
            </Profile>
          ))}
      </Content>
      <CreateMessage />
    </Wrapper>
  );
}

export default CreateThread;
