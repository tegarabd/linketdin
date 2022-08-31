import { useMutation, useQuery } from "@apollo/client";
import React, { ChangeEventHandler, useState } from "react";
import styled from "styled-components";
import InputWithIcon from "../../../../../components/form/InputWithIcon";
import Textarea from "../../../../../components/form/Textarea";
import ProfileName from "../../../../../components/profile/ProfileName";
import ProfilePhoto from "../../../../../components/profile/profilePhoto/ProfilePhoto";
import EntirePageModal from "../../../../../components/utilities/entirePage/EntirePageModal";
import { USER_PROFILE } from "../../../../../graphql/user";
import { useJwt } from "../../../../../hooks/useJwt";
import { ReactComponent as ImageIcon } from "../../../../../assets/image-icon.svg";
import { ReactComponent as VideoIcon } from "../../../../../assets/video-icon.svg";
import { ReactComponent as CrossIcon } from "../../../../../assets/cross-icon.svg";
import ButtonSecondary from "../../../../../components/utilities/button/ButtonSecondary";
import ButtonPrimary from "../../../../../components/utilities/button/ButtonPrimary";
import { CREATE_POST } from "../../../../../graphql/post";
import EntirePageLoading from "../../../../../components/utilities/entirePage/EntirePageLoading";
import uploadPostAttachment from "../../../../../firebase/uploadPostAttachment";
import { uuidv4 } from "@firebase/util";
import { useScroll } from "../../../../../hooks/useScroll";
import { CREATE_NOTIFICATION } from "../../../../../graphql/notification";

const Profile = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const OperationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FileButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Img = styled.img`
  max-width: 100%;
`;

const Video = styled.video`
  max-width: 100%;
`;
const Preview = styled.div`
  position: relative;
`;

const AbsoluteButtonClose = styled(ButtonSecondary)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;

function CreatePostModal({ onClose }: { onClose: VoidFunction }) {
  const { makeWindowScrollable } = useScroll();
  const { sub } = useJwt();
  const { data } = useQuery(USER_PROFILE, { variables: { id: sub } });
  const [file, setFile] = useState<File>(null!);
  const [source, setSource] = useState<string>(null!);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [createPost] = useMutation(CREATE_POST);
  const [createNotification] = useMutation(CREATE_NOTIFICATION)

  const handleTextChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setText(event.target.value);
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event!.target!.files![0];
    setFile(file);
    const url = URL.createObjectURL(file);
    setSource(url);
  };

  const removeFile = () => {
    setFile(null!);
    setSource(null!);
  };

  const uploadPost = async () => {
    setLoading(true);

    let photoUrl = "";
    let videoUrl = "";

    if (file) {
      const id = uuidv4();
      const url = await uploadPostAttachment(file, id);

      if (file.type.startsWith("image")) {
        photoUrl = url;
      } else if (file.type.startsWith("video")) {
        videoUrl = url;
      }
    }

    await createPost({
      variables: {
        input: {
          text,
          photoUrl,
          videoUrl,
          posterId: sub,
        },
      },
    });

    await createNotification({
      variables: {
        input: {
          fromId: sub,
          toId: "admin",
          text: "your connection, shared a post you may be interested in",
        },
      },
    });

    setLoading(false);
    makeWindowScrollable();
    onClose();
  };

  return (
    <EntirePageModal
      onClose={onClose}
      title="Create a post"
      position="top"
    >
      <>
        {loading && <EntirePageLoading />}
        {data && (
          <Profile>
            <ProfilePhoto
              user={data.user}
              size="large"
            />
            <ProfileName user={data.user} />
          </Profile>
        )}
        <Textarea
          placeholder="What do you want to talk about?"
          onChange={handleTextChange}
        ></Textarea>
        {file && file.type.startsWith("image") && (
          <Preview>
            <Img src={source} />
            <AbsoluteButtonClose onClick={removeFile}>
              <CrossIcon />
            </AbsoluteButtonClose>
          </Preview>
        )}
        {file && file.type.startsWith("video") && (
          <Preview>
            <Video
              src={source}
              controls
            />
            <AbsoluteButtonClose onClick={removeFile}>
              <CrossIcon />
            </AbsoluteButtonClose>
          </Preview>
        )}

        <OperationWrapper>
          <FileButtonWrapper>
            <InputWithIcon
              id="image"
              type="file"
              accept="image/*"
              icon={<ImageIcon />}
              disabled={file != null}
              onChange={handleFileChange}
            />
            <InputWithIcon
              id="video"
              type="file"
              accept="video/*"
              icon={<VideoIcon />}
              disabled={file != null}
              onChange={handleFileChange}
            />
          </FileButtonWrapper>
          <ButtonPrimary
            disabled={text === ""}
            onClick={uploadPost}
          >
            Post
          </ButtonPrimary>
        </OperationWrapper>
      </>
    </EntirePageModal>
  );
}

export default CreatePostModal;
