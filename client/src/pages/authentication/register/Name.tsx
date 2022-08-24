import React, { ChangeEvent, FormEvent, useState } from "react";
import Errors from "../../../components/form/Errors";
import Form from "../../../components/form/Form";
import Input from "../../../components/form/Input";
import ButtonPrimary from "../../../components/utilities/ButtonPrimary";
import Title from "../../../components/form/Title";
import EntirePageLayout from "../../../layouts/EntirePageLayout";
import { Redirect } from "../../../tools/Redirect";
import { RegisterData, RegisterName } from "../../../types/authentication";

function Name({
  handleSubmitName,
  registerData,
}: {
  handleSubmitName: (input: RegisterName) => void;
  registerData: RegisterData;
}) {
  const [error, setError] = useState<string>(null!);
  const [registerName, setRegisterName] = useState<RegisterName>({
    firstName: "",
    lastName: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRegisterName({
      ...registerName,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (registerName.firstName === "" || registerName.lastName === "") {
      setError("All field must be filled");
      return;
    }
    handleSubmitName(registerName);
  };

  if (registerData.email === "" || registerData.password === "") {
    return <Redirect to="/auth/register/email_password" />;
  }

  return (
    <EntirePageLayout>
      <Title>Register Name</Title>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <Input id="firstName" type="text" onChange={handleChange} />
        <label htmlFor="lastName">Last Name</label>
        <Input id="lastName" type="text" onChange={handleChange} />
        <Errors errors={[error]} />
        <ButtonPrimary type="submit">Next</ButtonPrimary>
      </Form>
    </EntirePageLayout>
  );
}

export default Name;
