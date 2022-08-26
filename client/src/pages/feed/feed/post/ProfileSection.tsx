import React from "react";
import styled from "styled-components";
import ProfileName from "../../../../components/profile/ProfileName";
import ProfilePhoto from "../../../../components/profile/profilePhoto/ProfilePhoto";
import { User } from "../../../../types/user";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3rem auto;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

function ProfileSection({ poster }: { poster: User }) {
  return (
    <Wrapper>
      <ProfilePhoto user={poster} size="large" />
      <ProfileName user={poster} withHeadline />
    </Wrapper>
  );
}

export default ProfileSection;
