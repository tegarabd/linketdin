import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProfileName from "../../../components/profile/ProfileName";
import ProfilePhoto from "../../../components/profile/profilePhoto/ProfilePhoto";
import ButtonPrimary from "../../../components/utilities/button/ButtonPrimary";
import Content from "../../../components/utilities/Content";
import { BLOCK_USER, FOLLOW_USER, USER_PROFILE } from "../../../graphql/user";
import ProfilePhotoDetail from "./ProfilePhotoDetail";
import { ReactComponent as ConnectIcon } from "../../../assets/connect-icon.svg";
import { ReactComponent as FollowIcon } from "../../../assets/follow-icon.svg";
import { ReactComponent as UpdateIcon } from "../../../assets/edit-icon.svg";
import { ReactComponent as BlockIcon } from "../../../assets/block-icon.svg";
import { useJwt } from "../../../hooks/useJwt";
import ButtonSecondary from "../../../components/utilities/button/ButtonSecondary";
import ConnectModal from "../../../components/connect/ConnectModal";
import { useProfile } from "../ProfileContextProvider";
import ProfileUpdateModal from "./ProfileUpdateModal";
import BackgroundPhotoDetail from "./BackgroundPhotoDetail";
import ButtonTertiary from "../../../components/utilities/button/ButtonTertiary";
import { CREATE_NOTIFICATION } from "../../../graphql/notification";

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
  cursor: pointer;
`;

const UpdateBackgroundButton = styled(ButtonSecondary)`
  position: absolute;
  right: 2rem;
  top: 2rem;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

function Profile() {
  const { canModify } = useProfile();
  const { userId } = useParams();
  const { sub } = useJwt();
  const { data } = useQuery(USER_PROFILE, { variables: { id: userId } });
  const [follow] = useMutation(FOLLOW_USER, {
    refetchQueries: [{ query: USER_PROFILE, variables: { id: userId } }],
  });
  const [block] = useMutation(BLOCK_USER, {
    refetchQueries: [{ query: USER_PROFILE, variables: { id: userId } }],
  });
  const [createNotification] = useMutation(CREATE_NOTIFICATION)

  const [profilePhotoDetailOpened, setProfilePhotoDetailOpened] =
    useState(false);
  const [backgroundPhotoDetailOpened, setBackgroundPhotoDetailOpened] =
    useState(false);
  const [connectModalOpened, setConnectModalOpened] = useState(false);
  const [updateModalOpened, setUpdateModalOpened] = useState(false);

  const [alreadyConnected, setAlreadyConnected] = useState(false);
  const [alreadyFollowed, setAlreadyFollowed] = useState(false);

  const openBackgroundPhotoDetail = () => {
    setBackgroundPhotoDetailOpened(true);
  };

  const closeBackgroundPhotoDetail = () => {
    setBackgroundPhotoDetailOpened(false);
  };

  const openProfilePhotoDetail = () => {
    setProfilePhotoDetailOpened(true);
  };

  const closeProfilePhotoDetail = () => {
    setProfilePhotoDetailOpened(false);
  };

  const openConnectModal = () => {
    setConnectModalOpened(true);
  };

  const closeConnectModal = () => {
    setConnectModalOpened(false);
  };

  const openUpdateModal = () => {
    setUpdateModalOpened(true);
  };

  const closeUpdateModal = () => {
    setUpdateModalOpened(false);
  };

  const handleFollow = () => {
    follow({
      variables: {
        input: {
          userId: sub,
          followingId: userId,
        },
      },
    });
    createNotification({
      variables: {
        input: {
          fromId: sub,
          toId: userId,
          text: "started following you"
        }
      }
    })
  };

  const handleBlock = () => {
    block({ variables: { input: { userId: sub, blockedId: userId } } });
  };

  useEffect(() => {
    if (data) {
      setAlreadyConnected(
        data.user.connections.find(
          (connection: { id: string }) => connection.id === sub
        )
      );
      setAlreadyFollowed(
        data.user.followers.find(
          (follower: { id: string }) => follower.id === sub
        )
      );
    }

    return () => {};
  }, [data]);

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
          <ProfileImg onClick={openProfilePhotoDetail}>
            <ProfilePhoto
              user={data.user}
              size="extra-large"
            />
            {profilePhotoDetailOpened && (
              <ProfilePhotoDetail
                user={data.user}
                onClose={closeProfilePhotoDetail}
              />
            )}
          </ProfileImg>
          {canModify && (
            <UpdateBackgroundButton onClick={openBackgroundPhotoDetail}>
              <UpdateIcon />
            </UpdateBackgroundButton>
          )}
          {backgroundPhotoDetailOpened && (
            <BackgroundPhotoDetail
              user={data.user}
              onClose={closeBackgroundPhotoDetail}
            />
          )}

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
            <p>{data.user.profileViews.length} Profile views</p>
            <ButtonGroup>
              {!(alreadyConnected || sub === userId) && (
                <ButtonPrimary onClick={openConnectModal}>
                  <ConnectIcon /> Connect
                </ButtonPrimary>
              )}
              {!(alreadyFollowed || sub === userId) && (
                <ButtonSecondary onClick={handleFollow}>
                  <FollowIcon /> Follow
                </ButtonSecondary>
              )}
              {canModify && (
                <ButtonPrimary onClick={openUpdateModal}>
                  <UpdateIcon /> Update profile
                </ButtonPrimary>
              )}
              {sub !== userId && (
                <ButtonTertiary onClick={handleBlock}>
                  <BlockIcon /> Block
                </ButtonTertiary>
              )}
            </ButtonGroup>
          </ProfileDescription>
          {connectModalOpened && (
            <ConnectModal
              fromId={sub}
              toId={userId || ""}
              onClose={closeConnectModal}
            />
          )}
          {updateModalOpened && (
            <ProfileUpdateModal
              user={data.user}
              onClose={closeUpdateModal}
            />
          )}
        </>
      )}
    </Wrapper>
  );
}

export default Profile;
