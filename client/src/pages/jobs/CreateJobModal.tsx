import { useMutation } from "@apollo/client";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  FormEventHandler,
  useState,
} from "react";
import styled from "styled-components";
import Errors from "../../components/form/Errors";
import Form from "../../components/form/Form";
import Input from "../../components/form/Input";
import Select from "../../components/form/Select";
import Textarea from "../../components/form/Textarea";
import EmploymentTypeSelect from "../../components/select/EmploymentTypeSelect";
import ButtonPrimary from "../../components/utilities/button/ButtonPrimary";
import EntirePageModal from "../../components/utilities/entirePage/EntirePageModal";
import { CREATE_JOB, JOBS } from "../../graphql/job";
import { useScroll } from "../../hooks/useScroll";

const TwoColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

function CreateJobModal({ onClose }: { onClose: VoidFunction }) {
  const [create] = useMutation(CREATE_JOB, {
    refetchQueries: [{ query: JOBS }],
  });
  const [data, setData] = useState({
    title: "",
    companyName: "",
    workplace: "",
    locationCity: "",
    locationRegion: "",
    employmentType: "",
    description: "",
  });
  const [error, setError] = useState<string>(null!);
  const { makeWindowScrollable } = useScroll();

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > = (event: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setError(null!);

    if (Object.values(data).some((value) => value === "")) {
      setError("All field must be filled");
      return;
    }

    create({
      variables: {
        input: data,
      },
    });

    makeWindowScrollable();
    onClose();
  };

  return (
    <EntirePageModal
      onClose={onClose}
      title="Create Job"
      position="top"
    >
      <Form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <Input
          id="title"
          onChange={handleChange}
          value={data.title}
        />
        <label htmlFor="companyName">Company Name</label>
        <Input
          id="companyName"
          onChange={handleChange}
          value={data.companyName}
        />
        <label htmlFor="workplace">Workplace</label>
        <Select
          id="workplace"
          onChange={handleChange}
          value={data.workplace}
        >
          <option value="">Select</option>
          <option value="On-site">On-site</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Remote">Remote</option>
        </Select>
        <label htmlFor="location">Location</label>
        <TwoColumn>
          <Column>
            <label htmlFor="locationRegion">Region</label>
            <Input
              id="locationRegion"
              onChange={handleChange}
              value={data.locationRegion}
            />
          </Column>
          <Column>
            <label htmlFor="locationCity">City</label>
            <Input
              id="locationCity"
              onChange={handleChange}
              value={data.locationCity}
            />
          </Column>
        </TwoColumn>
        <label htmlFor="employmentType">Employment Type</label>
        <EmploymentTypeSelect
          id="employmentType"
          onChange={handleChange}
          value={data.employmentType}
        />
        <label htmlFor="description">Description</label>
        <Textarea
          id="description"
          onChange={handleChange}
          value={data.description}
        ></Textarea>
        {error && <Errors errors={[error]} />}
        <ButtonPrimary type="submit">Save</ButtonPrimary>
      </Form>
    </EntirePageModal>
  );
}

export default CreateJobModal;
