import { useMutation } from "@apollo/client";
import React, { ChangeEventHandler, useRef, useState } from "react";
import EntirePageModal from "../../../components/utilities/entirePage/EntirePageModal";
import uploadBackgroundPhoto from "../../../firebase/uploadBackgroundPhoto";
import {
  UPDATE_USER_BACKGROUND_PHOTO,
  USER_PROFILE,
} from "../../../graphql/user";
import { useJwt } from "../../../hooks/useJwt";
import { User } from "../../../types/user";
import { useProfile } from "../ProfileContextProvider";
import { uuidv4 } from "@firebase/util";
import styled from "styled-components";
import ButtonTertiary from "../../../components/utilities/button/ButtonTertiary";
import EntirePageLoading from "../../../components/utilities/entirePage/EntirePageLoading";
import { useScroll } from "../../../hooks/useScroll";

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Img = styled.img`
  width: 100%;
  height: 10rem;
  object-fit: cover;
`;

function BackgroundPhotoDetail({
  user,
  onClose,
}: {
  user: User;
  onClose: VoidFunction;
}) {
  const { makeWindowScrollable } = useScroll();
  const { canModify } = useProfile();
  const { sub } = useJwt();
  const inputRef = useRef<HTMLInputElement>(null!);
  const [file, setFile] = useState<File>(null!);
  const [url, setUrl] = useState<string>(null!);
  const [loading, setLoading] = useState(false);
  const [update] = useMutation(UPDATE_USER_BACKGROUND_PHOTO, {
    refetchQueries: [{ query: USER_PROFILE, variables: { id: sub } }],
  });

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event!.target!.files![0];
    setFile(file);
    const url = URL.createObjectURL(file);
    setUrl(url);
  };

  const handleApply = async () => {
    setLoading(true);
    const url = await uploadBackgroundPhoto(file, `${user.email}-${uuidv4()}`);

    await update({
      variables: {
        id: sub,
        url,
      },
    });

    setLoading(false);
    makeWindowScrollable();
    onClose();
  };

  return (
    <EntirePageModal
      title="Background Photo"
      onClose={onClose}
      position="top"
    >
      {file ? (
        <Img src={url} />
      ) : (
        <Img
          src={
            user.backgroundPhotoUrl ||
            "https://static-exp1.licdn.com/sc/h/55k1z8997gh8dwtihm11aajyq"
          }
        />
      )}

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
      {loading && <EntirePageLoading />}
    </EntirePageModal>
  );
}

export default BackgroundPhotoDetail;
