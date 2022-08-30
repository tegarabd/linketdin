import { useMutation } from "@apollo/client";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Content from "../../components/utilities/Content";
import { USER_PROFILE, VIEW_USER } from "../../graphql/user";
import { useJwt } from "../../hooks/useJwt";
import MainSideLayout from "../../layouts/MainSideLayout";
import EducationType from "./education/Education";
import Experience from "./experience/Experience";
import Profile from "./profile/Profile";
import ProfileContextProvider, { useProfile } from "./ProfileContextProvider";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

function ProfileSection({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const { userId } = useParams();
  const { sub } = useJwt();
  const { canView } = useProfile();
  const [viewUser] = useMutation(VIEW_USER, {
    refetchQueries: [{ query: USER_PROFILE, variables: { id: userId } }],
  });

  if (!canView) {
    return (
      <h3>
        You're not allowed to view this profile, either you blocked this profile
        or this profile blocked you.
      </h3>
    );
  }

  useEffect(() => {
    if (sub === userId) {
      return;
    }
    viewUser({ variables: { viewerId: sub, viewedUserId: userId } });

    return () => {};
  }, []);

  return <Wrapper>{children}</Wrapper>;
}

function ProfilePage() {
  return (
    <ProfileContextProvider>
      <MainSideLayout>
        <ProfileSection>
          <Profile />
          <Experience />
          <EducationType />
        </ProfileSection>
        <Wrapper>
          <Content>User you might know</Content>
        </Wrapper>
      </MainSideLayout>
    </ProfileContextProvider>
  );
}

export default ProfilePage;
