import { useQuery } from "@apollo/client";
import React, { ChangeEventHandler, useState } from "react";
import styled from "styled-components";
import Input from "../../components/form/Input";
import ProfileName from "../../components/profile/ProfileName";
import ProfilePhoto from "../../components/profile/profilePhoto/ProfilePhoto";
import Line from "../../components/utilities/Line";
import { SEARCH_CONNECTED_USER } from "../../graphql/user";
import { useJwt } from "../../hooks/useJwt";
import { User } from "../../types/user";
import CreateMessage from "./CreateMessage";

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
`;

function CreateThread() {
  const [query, setQuery] = useState("");
  const { sub } = useJwt();
  const { data, fetchMore } = useQuery(SEARCH_CONNECTED_USER, {
    variables: {
      userId: sub,
      query,
    },
    skip: query === "",
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

  const handleSelectProfile = () => {
    
  }

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
            <Profile key={user.id}>
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
