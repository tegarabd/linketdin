import { uuidv4 } from "@firebase/util";
import React, { useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import styled from "styled-components";
import Errors from "../../../components/form/Errors";
import Title from "../../../components/form/Title";
import ButtonDanger from "../../../components/utilities/ButtonDanger";
import ButtonPrimary from "../../../components/utilities/ButtonPrimary";
import EntirePageLoading from "../../../components/utilities/EntirePageLoading";
import uploadProfilePhoto from "../../../firebase/uploadProfilePhoto";
import EntirePageLayout from "../../../layouts/EntirePageLayout";
import { Redirect } from "../../../tools/Redirect";
import {
  RegisterData,
  RegisterProfilePhoto,
} from "../../../types/authentication";

const UploadArea = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 500;
  border: 0.5rem solid ${(props) => props.theme.accent};
  border-radius: 50%;
  color: ${(props) => props.theme.accent};
  cursor: pointer;

  & > img {
    max-height: 18rem;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    object-fit: cover;
  }
`;

function ProfilePhoto({
  handleSubmitProfilePhoto,
  registerData,
}: {
  handleSubmitProfilePhoto: (input: RegisterProfilePhoto) => void;
  registerData: RegisterData;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null!);
  const [profilePhotos, setProfilePhotos] = useState<ImageListType>(null!);

  const handleChange = (imageList: ImageListType): void => {
    setError(null as never);
    setProfilePhotos(imageList);
  };

  const handleSubmit = async () => {
    if (profilePhotos[0] == undefined || profilePhotos[0].file == undefined) {
      setError("Image must be selected first" as never);
      return;
    }

    setLoading(true);
    const id = uuidv4();
    const profilePhotoUrl = await uploadProfilePhoto(
      profilePhotos[0].file,
      `${registerData.email}-${id}`
    );
    setLoading(false);

    handleSubmitProfilePhoto({ profilePhotoUrl });
  };

  if (
    registerData.jobTitle === "" ||
    registerData.employmentType === "" ||
    registerData.company === ""
  ) {
    return <Redirect to="/auth/register/job" />;
  }

  return (
    <EntirePageLayout>
      {loading && <EntirePageLoading />}
      <Title>Register Profile Photo</Title>
      <ImageUploading
        value={profilePhotos}
        onChange={handleChange}
        maxNumber={1}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <>
            <UploadArea
              style={isDragging ? { borderStyle: "dashed" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              {imageList[0] ? (
                <img src={imageList[0].dataURL} />
              ) : (
                <span>Click or Drop here</span>
              )}
            </UploadArea>
            <Errors errors={[error]} />
            <ButtonPrimary onClick={handleSubmit}>Confirm</ButtonPrimary>
            <ButtonDanger onClick={() => onImageRemove(0)}>Remove</ButtonDanger>
          </>
        )}
      </ImageUploading>
    </EntirePageLayout>
  );
}

export default ProfilePhoto;
