import { useMutation } from "@apollo/client";
import { ChangeEvent, FormEvent, useState } from "react";
import Errors from "../../../components/form/Errors";
import Form from "../../../components/form/Form";
import Input from "../../../components/form/Input";
import ButtonPrimary from "../../../components/utilities/button/ButtonPrimary";
import Title from "../../../components/form/Title";
import StyledLink from "../../../components/utilities/link/StyledLink";
import { IS_EMAIL_ALREADY_TAKEN } from "../../../graphql/authentication";
import EntirePageLayout from "../../../layouts/EntirePageLayout";
import GoogleSiginIn from "../../../tools/GoogleSiginIn";
import { RegisterEmailPassword } from "../../../types/authentication";

function EmailPassword({
  handleSubmitEmailPassword,
}: {
  handleSubmitEmailPassword: (input: RegisterEmailPassword) => void;
}) {
  const [error, setError] = useState<string>(null!);
  const [isEmailAlreadyTaken] = useMutation(IS_EMAIL_ALREADY_TAKEN);
  const [registerEmailPassword, setRegisterEmailPassword] =
    useState<RegisterEmailPassword>({
      email: "",
      password: "",
    });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRegisterEmailPassword({
      ...registerEmailPassword,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      auth: { isEmailAlreadyTaken: result },
    } = (
      await isEmailAlreadyTaken({
        variables: { email: registerEmailPassword.email },
      })
    ).data;

    if (result) {
      setError("Email already taken");
      return;
    }

    if (registerEmailPassword.password.length < 8) {
      setError("Password must be 8 characters or more");
      return;
    }

    handleSubmitEmailPassword(registerEmailPassword);
  };

  return (
    <EntirePageLayout>
      <Title>Register</Title>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <Input id="email" type="email" onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" onChange={handleChange} />
        <Errors errors={[error]} />
        <ButtonPrimary type="submit">Join</ButtonPrimary>
      </Form>
      <GoogleSiginIn />
      <span>
        Already on LinketdIn? <StyledLink to="/auth/login">Sign in</StyledLink>
      </span>
    </EntirePageLayout>
  );
}

export default EmailPassword;
