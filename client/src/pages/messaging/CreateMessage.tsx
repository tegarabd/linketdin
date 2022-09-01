import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import styled from "styled-components";
import Form from "../../components/form/Form";
import InputWithIcon from "../../components/form/InputWithIcon";
import Textarea from "../../components/form/Textarea";
import { ReactComponent as ImageIcon } from "../../assets/image-icon.svg";
import { ReactComponent as CrossIcon } from "../../assets/cross-icon.svg";
import ButtonSecondary from "../../components/utilities/button/ButtonSecondary";
import ButtonTertiary from "../../components/utilities/button/ButtonTertiary";
import ButtonPrimary from "../../components/utilities/button/ButtonPrimary";
import uploadMessagePhoto from "../../firebase/uploadMessagePhoto";
import { uuidv4 } from "@firebase/util";
import { useMutation } from "@apollo/client";
import { CREATE_MESSAGE } from "../../graphql/message";
import { THREAD } from "../../graphql/thread";
import { useParams } from "react-router-dom";
import { useJwt } from "../../hooks/useJwt";
import { USER_THREADS } from "../../graphql/user";
import EntirePageLoading from "../../components/utilities/entirePage/EntirePageLoading";

const ButtonGroup = styled.div`
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
`;

const Img = styled.img`
  width: 5rem;
  height: 5rem;
  object-fit: cover;
`;

const Preview = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.5rem;
`;

function CreateMessage() {
  const { sub } = useJwt();
  const { threadId } = useParams();
  const [file, setFile] = useState<File>(null!);
  const [source, setSource] = useState<string>(null!);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendMessage] = useMutation(CREATE_MESSAGE, {
    refetchQueries: [
      { query: THREAD, variables: { threadId } },
      { query: USER_THREADS, variables: { id: sub } },
    ],
  });

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
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

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    setLoading(true);
    if (text === "") {
      return;
    }

    if (file) {
      const url = await uploadMessagePhoto(file, `${uuidv4()}`);
      await sendMessage({
        variables: {
          input: {
            senderId: sub,
            threadId,
            text,
            imageUrl: url,
          },
        },
      });
    } else {
      await sendMessage({
        variables: {
          input: {
            senderId: sub,
            threadId,
            text,
          },
        },
      });
    }

    setText("");
    setFile(null!);
    setSource(null!);
    setLoading(false);
  };

  return (
    <div>
      {file && (
        <Preview>
          <Img src={source} />
          <ButtonTertiary onClick={removeFile}>
            <CrossIcon />
          </ButtonTertiary>
        </Preview>
      )}
      <form onSubmit={handleSubmit}>
        <Textarea
          id="text"
          onChange={handleChange}
          placeholder="Write a message..."
        ></Textarea>
        <ButtonGroup>
          <InputWithIcon
            id="image"
            type="file"
            accept="image/*"
            icon={<ImageIcon />}
            disabled={file != null}
            onChange={handleFileChange}
          />
          <ButtonPrimary>Send</ButtonPrimary>
        </ButtonGroup>
      </form>
      {loading && <EntirePageLoading/>}
    </div>
  );
}

export default CreateMessage;
