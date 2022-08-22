import { useMutation } from "@apollo/client";
import { ChangeEvent, FormEvent, useState } from "react";
import Errors from "../components/form/Errors";
import Form from "../components/form/Form";
import Input from "../components/form/Input";
import SubmitButton from "../components/form/SubmitButton";
import Title from "../components/form/Title";
import EntirePageLoading from "../components/utilities/EntirePageLoading";
import StyledLink from "../components/utilities/StyledLink";
import { REGISTER } from "../graphql/authentication";
import EntirePageLayout from "../layouts/EntirePageLayout";
import { useAuthentication } from "../providers/AuthenticationContextProvider";
import { RegisterData } from "../types/authentication";

function RegisterPage() {
  const authentication = useAuthentication();
  const [register, { data: activationId, loading, error }] =
    useMutation(REGISTER);
  const [registerData, setRegisterData] = useState<RegisterData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {
      auth: {
        register: { activationId },
      },
    } = (await register({ variables: { input: registerData } })).data;
    console.log(activationId);
  };

  if (loading) {
    return <span>Loading</span>;
  }

  return (
    <EntirePageLayout>
      <Title>Sign Up</Title>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <Input id="firstName" type="firstName" onChange={handleChange} />
        <label htmlFor="lastName">Last Name</label>
        <Input id="lastName" type="lastName" onChange={handleChange} />
        <label htmlFor="email">Email</label>
        <Input id="email" type="email" onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" onChange={handleChange} />
        {error && <Errors errors={error.message.split("#")} />}
        <SubmitButton type="submit">Join</SubmitButton>
      </Form>
      <span>
        Already in LinketdIn? <StyledLink to="/auth/login">Sign in</StyledLink>
      </span>
      {loading && <EntirePageLoading />}
    </EntirePageLayout>
  );
}

export default RegisterPage;
