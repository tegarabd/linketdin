import { useMutation } from "@apollo/client";
import { uuidv4 } from "@firebase/util";
import React, { ChangeEventHandler, useRef, useState } from "react";
import styled from "styled-components";
import ProfilePhoto from "../../../components/profile/profilePhoto/ProfilePhoto";
import ButtonTertiary from "../../../components/utilities/button/ButtonTertiary";
import EntirePageLoading from "../../../components/utilities/entirePage/EntirePageLoading";
import EntirePageModal from "../../../components/utilities/entirePage/EntirePageModal";
import uploadProfilePhoto from "../../../firebase/uploadProfilePhoto";
import { UPDATE_USER_PROFILE_PHOTO, USER_PROFILE } from "../../../graphql/user";
import { useJwt } from "../../../hooks/useJwt";
import { User } from "../../../types/user";
import { useProfile } from "../ProfileContextProvider";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Img = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  border: 0.25rem solid ${(props) => props.theme.secondary};
  object-fit: cover;
`;

function ProfilePhotoDetail({
  user,
  onClose,
}: {
  user: User;
  onClose: VoidFunction;
}) {
  const { canModify } = useProfile();
  const { sub } = useJwt();
  const inputRef = useRef<HTMLInputElement>(null!);
  const [file, setFile] = useState<File>(null!);
  const [url, setUrl] = useState<string>(null!);
  const [update, { loading }] = useMutation(UPDATE_USER_PROFILE_PHOTO, {
    refetchQueries: [{ query: USER_PROFILE, variables: { id: sub } }],
  });

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event!.target!.files![0];
    setFile(file);
    const url = URL.createObjectURL(file);
    setUrl(url);
  };

  const handleApply = async () => {
    const url = await uploadProfilePhoto(file, `${user.email}-${uuidv4()}`);

    await update({
      variables: {
        id: sub,
        url,
      },
    });

    onClose();
  };

  return (
    <EntirePageModal
      title="Profile Photo"
      position="top"
      onClose={onClose}
    >
      {loading && <EntirePageLoading />}
      <Wrapper>
        {file ? (
          <Img src={url} />
        ) : (
          <ProfilePhoto
            user={user}
            size="extra-large"
          />
        )}
      </Wrapper>
      {canModify && (
        <ButtonGroup>
          <ButtonTertiary onClick={() => inputRef.current.click()}>
            Update
          </ButtonTertiary>
          <input
            ref={inputRef}
            id="profilePhoto"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            hidden
          />
          <ButtonTertiary
            onClick={handleApply}
            disabled={!file}
          >
            Apply
          </ButtonTertiary>
        </ButtonGroup>
      )}
    </EntirePageModal>
  );
}

export default ProfilePhotoDetail;
