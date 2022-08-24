import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import ReactCodeInput from "react-code-input";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Errors from "../../../components/form/Errors";
import Form from "../../../components/form/Form";
import Title from "../../../components/form/Title";
import EntirePageLoading from "../../../components/utilities/EntirePageLoading";
import { ACTIVATE } from "../../../graphql/authentication";
import EntirePageLayout from "../../../layouts/EntirePageLayout";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

function ActivationId() {
  const navigate = useNavigate();
  const { activationId } = useParams();
  const [code, setCode] = useState("");
  const [activate, { loading, data, error }] = useMutation(ACTIVATE);

  useEffect(() => {
    if (data && !error) {
      navigate("/auth/login");
    }

    return () => {};
  }, [data]);

  const handleChange = (res: string) => {
    setCode(res);
    if (res.length === 6) {
      activate({ variables: { input: { activationId, code: res } } });
    }
  };

  return (
    <EntirePageLayout>
      {loading && <EntirePageLoading />}
      <Title>Activate Account</Title>
      <Wrapper>
        <label>Activation Code</label>
        <ReactCodeInput
          name="activationCode"
          type="tel"
          fields={6}
          value={code}
          onChange={handleChange}
          inputMode="tel"
        />
        {error && <Errors errors={[error.message]} />}
      </Wrapper>
    </EntirePageLayout>
  );
}

export default ActivationId;
