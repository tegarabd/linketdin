import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProfileName from "../../../components/profile/ProfileName";
import ProfilePhoto from "../../../components/profile/profilePhoto/ProfilePhoto";
import Content from "../../../components/utilities/Content";
import { USER_PROFILE } from "../../../graphql/user";

const Wrapper = styled(Content)`
  padding: 0;
  overflow: hidden;
  position: relative;
  min-height: 20rem;
`;

const BackgroundImg = styled.img`
  width: 100%;
  height: 12rem;
  object-fit: cover;
`;

const ProfileImg = styled.div`
  position: absolute;
  left: 2rem;
  top: 4rem;
`;

const ProfileDescription = styled.div`
  margin-top: 1rem;
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & > p {
    font-weight: 500;
  }
`;

function Profile() {
  const { userId } = useParams();
  const { data } = useQuery(USER_PROFILE, { variables: { id: userId } });

  return (
    <Wrapper>
      {data && (
        <>
          <BackgroundImg
            src={
              data.user.backgroundPhotoUrl ||
              "https://static-exp1.licdn.com/sc/h/55k1z8997gh8dwtihm11aajyq"
            }
            alt=""
          />
          <ProfileImg>
            <ProfilePhoto user={data.user} size="extra-large" />
          </ProfileImg>
          <ProfileDescription>
            <ProfileName
              user={data.user}
              withHeadline
              withPronouns
              size="large"
            />
            {data.user.location.city && (
              <p>{`${data.user.location.city}, ${data.user.location.region}`}</p>
            )}
            <p>{data.user.profileViews} Profile views</p>
          </ProfileDescription>
        </>
      )}
    </Wrapper>
  );
}

export default Profile;
