import { useMutation } from "@apollo/client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Errors from "../components/form/Errors";
import Form from "../components/form/Form";
import Input from "../components/form/Input";
import SubmitButton from "../components/form/SubmitButton";
import Title from "../components/form/Title";
import BlurButton from "../components/utilities/BlurButton";
import EntirePageLoading from "../components/utilities/EntirePageLoading";
import { VERIFY_EMAIL } from "../graphql/authentication";
import EntirePageLayout from "../layouts/EntirePageLayout";

function VerifyEmailPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [verifyEmail, { data, error, loading }] = useMutation(VERIFY_EMAIL);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {
      auth: {
        verifyForgotPasswordEmail: { forgotPasswordId },
      },
    } = (await verifyEmail({ variables: { email } })).data;
    if (forgotPasswordId) {
      navigate("/auth/forgot_password/verify_code")
    }
  };

  return (
    <EntirePageLayout>
      <Title>Forgot Password</Title>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <Input id="email" type="email" onChange={handleChange} />
        {error && <Errors errors={error.message.split("#")} />}
        <SubmitButton type="submit">Reset password</SubmitButton>
        <BlurButton onClick={() => navigate(-1)}>Back</BlurButton>
      </Form>
      {loading && <EntirePageLoading />}
    </EntirePageLayout>
  );
}

export default VerifyEmailPage;
