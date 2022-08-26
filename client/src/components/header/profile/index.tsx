import { useQuery } from "@apollo/client";
import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as ArrowIcon } from "../../../assets/arrow-icon.svg";
import { USER_PROFILE } from "../../../graphql/user";
import { useJwt } from "../../../hooks/useJwt";
import EntirePageLoading from "../../utilities/entirePage/EntirePageLoading";
import ProfilePhoto from "../../profile/profilePhoto/ProfilePhoto";
import PhotoPhotoPlaceholder from "../../profile/profilePhoto/ProfilePhotoPlaceholder";
import ProfileDetail from "./ProfileDetail";

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  profilePhotoUrl: string;
  headline: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 6rem;
  border-bottom: 0.125rem solid transparent;
  cursor: pointer;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > span {
    font-size: 0.7rem;
  }
`;

function Profile() {
  const { sub } = useJwt();
  const { client, data, loading } = useQuery(USER_PROFILE, {
    variables: { id: sub },
  });

  const [detailOpened, setDetailOpened] = useState(false);
  const toggleDetail = () => {
    setDetailOpened((prev) => !prev);
  };

  return (
    <>
      <Wrapper onClick={toggleDetail}>
        {loading && <EntirePageLoading />}
        {data && <ProfilePhoto user={data.user} size="small" />}
        <Text>
          <span>Me</span>
          <ArrowIcon />
        </Text>
      </Wrapper>
      {data && detailOpened && (
        <ProfileDetail user={data.user} client={client} />
      )}
    </>
  );
}

export default Profile;
