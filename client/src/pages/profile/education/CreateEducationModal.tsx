import { useMutation } from "@apollo/client";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import styled from "styled-components";
import Errors from "../../../components/form/Errors";
import Form from "../../../components/form/Form";
import Input from "../../../components/form/Input";
import ButtonPrimary from "../../../components/utilities/button/ButtonPrimary";
import EntirePageModal from "../../../components/utilities/entirePage/EntirePageModal";
import { CREATE_EDUCATION } from "../../../graphql/education";
import { USER_EDUCATIONS } from "../../../graphql/user";
import { useJwt } from "../../../hooks/useJwt";
import { useScroll } from "../../../hooks/useScroll";

const Wrapper = styled.div`
  padding: 1rem;
`;

function CreateEducationModal({ onClose }: { onClose: VoidFunction }) {
  const { makeWindowScrollable } = useScroll();
  const { sub } = useJwt();
  const [data, setData] = useState({
    userId: sub,
    school: "",
  });
  const [create] = useMutation(CREATE_EDUCATION, {
    refetchQueries: [{ query: USER_EDUCATIONS, variables: { id: sub } }],
  });
  const [error, setError] = useState<string>(null!);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setData({
      ...data,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setError(null!);

    if (data.school === "") {
      setError("The field must be filled");
      return;
    }

    await create({ variables: { input: data } });
    makeWindowScrollable();
    onClose();
  };

  return (
    <EntirePageModal
      title="Education"
      onClose={onClose}
      position="top"
    >
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="school">School</label>
          <Input
            id="school"
            value={data.school}
            onChange={handleChange}
          />
          {error && <Errors errors={[error]} />}
          <ButtonPrimary type="submit">Save</ButtonPrimary>
        </Form>
      </Wrapper>
    </EntirePageModal>
  );
}

export default CreateEducationModal;
