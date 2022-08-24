import { useMutation } from "@apollo/client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Errors from "../../../components/form/Errors";
import Form from "../../../components/form/Form";
import Input from "../../../components/form/Input";
import ButtonPrimary from "../../../components/utilities/ButtonPrimary";
import Title from "../../../components/form/Title";
import ButtonBlur from "../../../components/utilities/ButtonBlur";
import EntirePageLoading from "../../../components/utilities/EntirePageLoading";
import { VERIFY_EMAIL } from "../../../graphql/authentication";
import EntirePageLayout from "../../../layouts/EntirePageLayout";

function VerifyEmailPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [verifyEmail, { data, error, loading }] = useMutation(VERIFY_EMAIL);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    verifyEmail({ variables: { email } });
  };

  useEffect(() => {
    if (data) {
      navigate(
        `/auth/forgot_password/verify_code/${data.auth.verifyForgotPasswordEmail.forgotPasswordId}`
      );
    }
    return () => {};
  }, [data]);

  return (
    <EntirePageLayout>
      <Title>Forgot Password</Title>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <Input id="email" type="email" onChange={handleChange} />
        {error && <Errors errors={error.message.split("#")} />}
        <ButtonPrimary type="submit">Reset password</ButtonPrimary>
        <ButtonBlur onClick={() => navigate(-1)}>Back</ButtonBlur>
      </Form>
      {loading && <EntirePageLoading />}
    </EntirePageLayout>
  );
}

export default VerifyEmailPage;
