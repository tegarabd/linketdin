import React from "react";
import styled from "styled-components";
import ProfileNameHeadline from "../../../../components/profile/ProfileNameHeadline";
import ProfilePhoto from "../../../../components/profile/profilePhoto/ProfilePhoto";
import { User } from "../../../../types/user";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3rem auto;
  gap: 0.5rem;
`;

function ProfileSection({ poster }: { poster: User }) {
  return (
    <Wrapper>
      <ProfilePhoto user={poster} size="large" />
      <ProfileNameHeadline user={poster} />
    </Wrapper>
  );
}

export default ProfileSection;
