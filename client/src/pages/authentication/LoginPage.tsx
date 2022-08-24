import { useMutation } from "@apollo/client";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Errors from "../../components/form/Errors";
import Form from "../../components/form/Form";
import Input from "../../components/form/Input";
import ButtonPrimary from "../../components/utilities/ButtonPrimary";
import Title from "../../components/form/Title";
import EntirePageLoading from "../../components/utilities/EntirePageLoading";
import StyledLink from "../../components/utilities/StyledLink";
import { LOGIN } from "../../graphql/authentication";
import EntirePageLayout from "../../layouts/EntirePageLayout";
import { useAuthentication } from "../../providers/AuthenticationContextProvider";
import GoogleSiginIn from "../../tools/GoogleSiginIn";
import { LoginData } from "../../types/authentication";

function LoginPage() {
  const navigate = useNavigate();
  const authentication = useAuthentication();
  const [login, { loading, error }] = useMutation(LOGIN);
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {
      auth: {
        login: { token },
      },
    } = (await login({ variables: { input: loginData } })).data;
    authentication.login(token);
    navigate("/feed");
  };

  return (
    <EntirePageLayout>
      <Title>Sign In</Title>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <Input id="email" type="email" onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" onChange={handleChange} />
        <StyledLink to="/auth/forgot_password/verify_email">
          Forgot password?
        </StyledLink>
        {error && <Errors errors={error.message.split("#")} />}
        <ButtonPrimary type="submit">Sign in</ButtonPrimary>
      </Form>
      <GoogleSiginIn />
      <span>
        New to LinketdIn?{" "}
        <StyledLink to="/auth/register/email_password">Join now</StyledLink>
      </span>
      {loading && <EntirePageLoading />}
    </EntirePageLayout>
  );
}

export default LoginPage;
