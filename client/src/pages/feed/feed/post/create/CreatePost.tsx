import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import styled from "styled-components";
import ProfilePhoto from "../../../../../components/profile/profilePhoto/ProfilePhoto";
import Content from "../../../../../components/utilities/Content";
import { USER_PROFILE } from "../../../../../graphql/user";
import { useJwt } from "../../../../../hooks/useJwt";
import CreatePostModal from "./CreatePostModal";

const Wrapper = styled(Content)`
  display: grid;
  grid-template-columns: 3rem auto;
  gap: 0.5rem;
`;

const ButtonCapsule = styled.button`
  border-radius: 100vw;
  font-weight: 500;
  border: 1px solid ${(props) => props.theme.shadow};
  text-align: left;
  padding: 0 1rem;
  color: ${(props) => props.theme.fontDimmed};
  cursor: pointer;
`;

function CreatePost() {
  const { sub } = useJwt();
  const { data } = useQuery(USER_PROFILE, {
    variables: { id: sub },
  });
  const [modalOpened, setModalOpened] = useState(false);

  const openModal = () => {
    setModalOpened(true);
    document.documentElement.style.setProperty("overflow-y", "hidden");
  };

  const closeModal = () => {
    setModalOpened(false);
    document.documentElement.style.setProperty("overflow-y", "auto");
  };

  return (
    <Wrapper>
      {data && <ProfilePhoto user={data.user} size="large" />}
      <ButtonCapsule onClick={openModal}>Start a post</ButtonCapsule>
      {modalOpened && <CreatePostModal onClose={closeModal} />}
    </Wrapper>
  );
}

export default CreatePost;
