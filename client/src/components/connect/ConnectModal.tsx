import { useMutation } from "@apollo/client";
import React, { ChangeEventHandler, useState } from "react";
import styled from "styled-components";
import { CONNECT_USER } from "../../graphql/connect";
import { USER_PROFILE } from "../../graphql/user";
import Textarea from "../form/Textarea";
import ButtonPrimary from "../utilities/button/ButtonPrimary";
import EntirePageModal from "../utilities/entirePage/EntirePageModal";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

function ConnectModal({
  fromId,
  toId,
  onClose,
}: {
  fromId: string;
  toId: string;
  onClose: VoidFunction;
}) {
  const [note, setNote] = useState("");
  const [connect] = useMutation(CONNECT_USER, {
    refetchQueries: [{ query: USER_PROFILE, variables: { id: toId } }],
  });

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setNote(event.target.value);
  };

  const handleSend = async () => {
    await connect({
      variables: {
        fromId,
        toId,
        note,
      },
    });
    onClose();
  };

  return (
    <EntirePageModal
      title="You can customize this invitation"
      position="top"
      onClose={onClose}
    >
      <Wrapper>
        <p>
          LinkedIn members are more likely to accept invitations that include a
          personal note.
        </p>
        <label htmlFor="note">Note</label>
        <Textarea
          id="note"
          onChange={handleChange}
          placeholder="Ex: We know each other from..."
        ></Textarea>
        <ButtonPrimary onClick={handleSend}>Send</ButtonPrimary>
      </Wrapper>
    </EntirePageModal>
  );
}

export default ConnectModal;
