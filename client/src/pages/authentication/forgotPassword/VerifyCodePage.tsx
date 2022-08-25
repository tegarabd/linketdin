import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import ReactCodeInput from "react-code-input";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Errors from "../../../components/form/Errors";
import Title from "../../../components/form/Title";
import EntirePageLoading from "../../../components/utilities/entirePage/EntirePageLoading";
import { VERIFY_FORGOT_PASSWORD_CODE } from "../../../graphql/authentication";
import EntirePageLayout from "../../../layouts/EntirePageLayout";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

function VerifyCodePage({
  setIsValidCode,
  setUserId,
}: {
  setIsValidCode: (valid: boolean) => void;
  setUserId: (userId: string) => void;
}) {
  const navigate = useNavigate();
  const { forgotPasswordId } = useParams();
  const [code, setCode] = useState("");
  const [verify, { data, loading, error }] = useMutation(
    VERIFY_FORGOT_PASSWORD_CODE
  );

  useEffect(() => {
    if (data && !error) {
      setIsValidCode(true);
      setUserId(data.auth.verifyForgotPasswordCode.id);
      navigate("/auth/forgot_password/reset_password");
    }

    return () => {};
  }, [data]);

  const handleChange = (res: string) => {
    setCode(res);
    if (res.length === 6) {
      verify({ variables: { input: { forgotPasswordId, code: res } } });
    }
  };

  return (
    <EntirePageLayout>
      {loading && <EntirePageLoading />}
      <Title>Verify Forgot Password Code</Title>
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

export default VerifyCodePage;
