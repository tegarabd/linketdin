import React, { ChangeEvent, FormEvent, useState } from "react";
import Errors from "../../../components/form/Errors";
import Form from "../../../components/form/Form";
import Input from "../../../components/form/Input";
import ButtonPrimary from "../../../components/utilities/ButtonPrimary";
import Title from "../../../components/form/Title";
import EntirePageLayout from "../../../layouts/EntirePageLayout";
import { Redirect } from "../../../tools/Redirect";
import { RegisterData, RegisterLocation } from "../../../types/authentication";

function Location({
  handleSubmitLocation,
  registerData,
}: {
  handleSubmitLocation: (input: RegisterLocation) => void;
  registerData: RegisterData;
}) {
  const [error, setError] = useState<string>(null!);
  const [registerLocation, setRegisterLocation] = useState<RegisterLocation>({
    locationCity: "",
    locationRegion: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRegisterLocation({
      ...registerLocation,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      registerLocation.locationCity === "" ||
      registerLocation.locationRegion === ""
    ) {
      setError("All field must be filled");
      return;
    }
    handleSubmitLocation(registerLocation);
  };

  if (registerData.firstName === "" || registerData.lastName === "") {
    return <Redirect to="/auth/register/name" />;
  }

  return (
    <EntirePageLayout>
      <Title>Register Location</Title>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="locationRegion">Country/Region</label>
        <Input id="locationRegion" type="text" onChange={handleChange} />
        <label htmlFor="locationCity">City/District</label>
        <Input id="locationCity" type="text" onChange={handleChange} />
        <Errors errors={[error]} />
        <ButtonPrimary type="submit">Next</ButtonPrimary>
      </Form>
    </EntirePageLayout>
  );
}

export default Location;
