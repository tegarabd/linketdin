import React, { ChangeEvent, FormEvent, useState } from "react";
import Errors from "../../../components/form/Errors";
import Form from "../../../components/form/Form";
import Input from "../../../components/form/Input";
import Select from "../../../components/form/Select";
import ButtonPrimary from "../../../components/utilities/button/ButtonPrimary";
import Title from "../../../components/form/Title";
import EntirePageLayout from "../../../layouts/EntirePageLayout";
import { Redirect } from "../../../tools/Redirect";
import { RegisterData, RegisterJob } from "../../../types/authentication";

function Job({
  handleSubmitJob,
  registerData,
}: {
  handleSubmitJob: (input: RegisterJob) => void;
  registerData: RegisterData;
}) {
  const [error, setError] = useState<string>(null!);
  const [registerJob, setRegisterJob] = useState<RegisterJob>({
    company: "",
    employmentType: "",
    jobTitle: "",
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setRegisterJob({
      ...registerJob,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      registerJob.company === "" ||
      registerJob.employmentType === "" ||
      registerJob.jobTitle === ""
    ) {
      setError("All field must be filled");
      return;
    }
    handleSubmitJob(registerJob);
  };

  if (registerData.locationCity === "" || registerData.locationRegion === "") {
    return <Redirect to="/auth/register/location" />;
  }

  return (
    <EntirePageLayout>
      <Title>Register Recent Job</Title>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="jobTitle">Most recent job title</label>
        <Input id="jobTitle" type="text" onChange={handleChange} />
        <label htmlFor="employmentType">Employment type</label>
        <Select id="employmentType" onChange={handleChange}>
          <option value="">Select one</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Self-employed">Self-employed</option>
          <option value="Freelance">Freelance</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
          <option value="Apprenticeship">Apprenticeship</option>
          <option value="Seasonal">Seasonal</option>
        </Select>
        <label htmlFor="company">Most recent job company</label>
        <Input id="company" type="text" onChange={handleChange} />
        <Errors errors={[error]} />
        <ButtonPrimary type="submit">Next</ButtonPrimary>
      </Form>
    </EntirePageLayout>
  );
}

export default Job;
