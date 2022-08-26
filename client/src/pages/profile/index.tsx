import React from "react";
import styled from "styled-components";
import Content from "../../components/utilities/Content";
import MainSideLayout from "../../layouts/MainSideLayout";
import Education from "./education/Education";
import Experience from "./experience/Experience";
import Profile from "./profile/Profile";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

function ProfilePage() {
  return (
    <MainSideLayout>
      <Wrapper>
        <Profile />
        <Experience />
        <Education />
      </Wrapper>
      <Wrapper>
        <Content>User you might know</Content>
      </Wrapper>
    </MainSideLayout>
  );
}

export default ProfilePage;
