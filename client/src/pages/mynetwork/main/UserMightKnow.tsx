import { useQuery } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import Content from "../../../components/utilities/Content";
import { USER_MIGHT_KNOW } from "../../../graphql/user";
import { useJwt } from "../../../hooks/useJwt";
import { User } from "../../../types/user";
import ProfileCard from "./ProfileCard";

const ProfileCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;

function UserMightKnow() {
  const { sub } = useJwt();
  const { data } = useQuery(USER_MIGHT_KNOW, { variables: { id: sub } });

  return (
    <Content padding="1rem">
      <h3>You may know</h3>
      {data &&
        (data.user.userMightKnow.length > 0 ? (
          <ProfileCardWrapper>
            {data.user.userMightKnow.map((user: User) => (
              <ProfileCard
                key={user.id}
                user={user}
              />
            ))}
          </ProfileCardWrapper>
        ) : (
          <p>No people you might know yet</p>
        ))}
    </Content>
  );
}

export default UserMightKnow;
