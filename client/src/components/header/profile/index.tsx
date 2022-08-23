import { useQuery } from "@apollo/client";
import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as ArrowIcon } from "../../../assets/arrow-icon.svg";
import { USER_PROFILE } from "../../../graphql/user";
import { useJwt } from "../../../hooks/useJwt";
import EntirePageLoading from "../../utilities/EntirePageLoading";
import PhotoPlaceHolder from "./PhotoPlaceHolder";
import ProfileDetail from "./ProfileDetail";

export interface UserProfile {
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

  & > img {
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
  }
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
  const { userId } = useJwt();
  const { data, loading } = useQuery(USER_PROFILE, {
    variables: { id: userId },
  });

  const [detailOpened, setDetailOpened] = useState(false);
  const toggleDetail = () => {
    setDetailOpened((prev) => !prev);
  };

  return (
    <>
      <Wrapper onClick={toggleDetail}>
        {loading && <EntirePageLoading />}
        {data &&
          (data.user.profilePhotoUrl ? (
            <img src={data.user.profilePhotoUrl} />
          ) : (
            <PhotoPlaceHolder user={data.user} />
          ))}
        <Text>
          <span>Me</span>
          <ArrowIcon />
        </Text>
      </Wrapper>
      {data && detailOpened && <ProfileDetail user={data.user} />}
    </>
  );
}

export default Profile;
