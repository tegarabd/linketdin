import { useMutation } from "@apollo/client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Errors from "../../../components/form/Errors";
import Form from "../../../components/form/Form";
import Input from "../../../components/form/Input";
import Title from "../../../components/form/Title";
import ButtonPrimary from "../../../components/utilities/button/ButtonPrimary";
import EntirePageLoading from "../../../components/utilities/entirePage/EntirePageLoading";
import { RESET_PASSWORD } from "../../../graphql/authentication";
import EntirePageLayout from "../../../layouts/EntirePageLayout";
import { Redirect } from "../../../tools/Redirect";

function ResetPasswordPage({
  isValidCode,
  userId,
}: {
  isValidCode: boolean;
  userId: string;
}) {
  const navigate = useNavigate();
  const [resetPassword, { loading, error, data }] = useMutation(RESET_PASSWORD);
  const [resetPasswordData, setResetPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (data && !error) {
      navigate("/auth/login");
    }

    return () => {};
  }, [data]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setResetPasswordData({
      ...resetPasswordData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetPassword({
      variables: {
        input: {
          userId,
          password: resetPasswordData.password,
          confirmPassword: resetPasswordData.confirmPassword,
        },
      },
    });
  };

  if (!isValidCode || userId === "") {
    return <Redirect to="/auth/login" />;
  }

  return (
    <EntirePageLayout>
      {loading && <EntirePageLoading />}
      <Title>Reset Password</Title>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="password">New Password</label>
        <Input id="password" type="password" onChange={handleChange} />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <Input id="confirmPassword" type="password" onChange={handleChange} />
        {error && <Errors errors={[error.message]} />}
        <ButtonPrimary type="submit">Reset</ButtonPrimary>
      </Form>
    </EntirePageLayout>
  );
}

export default ResetPasswordPage;
