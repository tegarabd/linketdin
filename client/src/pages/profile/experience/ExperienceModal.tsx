import { useMutation } from "@apollo/client";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  FormEventHandler,
  useState,
} from "react";
import styled from "styled-components";
import Errors from "../../../components/form/Errors";
import Form from "../../../components/form/Form";
import Input from "../../../components/form/Input";
import Select from "../../../components/form/Select";
import EmploymentTypeSelect from "../../../components/select/EmploymentTypeSelect";
import MonthSelect from "../../../components/select/MonthSelect";
import YearSelect from "../../../components/select/YearSelect";
import ButtonPrimary from "../../../components/utilities/button/ButtonPrimary";
import EntirePageModal from "../../../components/utilities/entirePage/EntirePageModal";
import {
  CREATE_EXPERIENCE,
  UPDATE_EXPERIENCE,
} from "../../../graphql/experience";
import { USER_EXPERIENCES, USER_PROFILE } from "../../../graphql/user";
import { useJwt } from "../../../hooks/useJwt";
import { useScroll } from "../../../hooks/useScroll";
import { Experience } from "../../../types/experience";

const Wrapper = styled.div`
  padding: 1rem;
`;

const CheckBox = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const TwoColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`;

function ExperienceModal({
  onClose,
  experience,
}: {
  onClose: VoidFunction;
  experience?: Experience;
}) {
  const { makeWindowScrollable } = useScroll();
  const { sub } = useJwt();
  const [data, setData] = useState({
    title: experience?.title || "",
    employmentType: experience?.employmentType || "",
    companyName: experience?.companyName || "",
    isActive: experience?.isActive || false,
    locationCity: experience?.location?.city || "",
    locationRegion: experience?.location?.region || "",
    startDateMonth: experience?.startDate?.month || "",
    startDateYear: experience?.startDate?.year || 0,
    endDateMonth: experience?.endDate?.month || "",
    endDateYear: experience?.endDate?.year || 0,
    industry: experience?.industry || "",
    headline: experience?.headline || "",
  });

  const [errors, setErrors] = useState<Array<string>>([]);
  const [update] = useMutation(UPDATE_EXPERIENCE, {
    refetchQueries: [
      { query: USER_EXPERIENCES, variables: { id: sub } },
      { query: USER_PROFILE, variables: { id: sub } },
    ],
  });
  const [create] = useMutation(CREATE_EXPERIENCE, {
    refetchQueries: [
      { query: USER_EXPERIENCES, variables: { id: sub } },
      { query: USER_PROFILE, variables: { id: sub } },
    ],
  });

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [event.target.id]: event.target.value,
    });
  };

  const handleChangeActive: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setData({
      ...data,
      [event.target.id]: event.target.checked,
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    setErrors([]);
    let isError = false;

    if (
      data.title === "" ||
      data.employmentType === "" ||
      data.companyName === "" ||
      data.locationCity === "" ||
      data.locationRegion === "" ||
      data.startDateMonth === "" ||
      data.startDateYear === 0 ||
      data.industry === ""
    ) {
      setErrors([...errors, "All required field must be filled"]);
      isError = true;
    }

    if (
      !data.isActive &&
      (data.endDateMonth === "" || data.endDateYear === 0)
    ) {
      setErrors([
        ...errors,
        "End date is required if you are currently not working in this role",
      ]);
      isError = true;
    }

    if (isError) return;

    if (experience) {
      await update({
        variables: { input: { ...data, experienceId: experience.id } },
      });
    } else {
      await create({
        variables: { input: { ...data, userId: sub } },
      });
    }
    makeWindowScrollable();
    onClose();
  };

  const currentYear = new Date().getFullYear();

  return (
    <EntirePageModal
      onClose={onClose}
      title="Experience"
      position="top"
    >
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <Input
            id="title"
            value={data.title}
            onChange={handleChange}
          />
          <label htmlFor="employmentType">Employment Type</label>
          <EmploymentTypeSelect
            id="employmentType"
            value={data.employmentType}
            onChange={handleChange}
          />
          <label htmlFor="companyName">Company Name</label>
          <Input
            id="companyName"
            value={data.companyName}
            onChange={handleChange}
          />
          <label htmlFor="location">Location</label>
          <TwoColumnWrapper>
            <Input
              id="locationCity"
              value={data.locationCity}
              onChange={handleChange}
            />
            <Input
              id="locationRegion"
              value={data.locationRegion}
              onChange={handleChange}
            />
          </TwoColumnWrapper>
          <CheckBox>
            <Input
              type="checkbox"
              id="isActive"
              checked={data.isActive}
              onChange={handleChangeActive}
            />
            <label htmlFor="isActive">
              I am currently working in this role
            </label>
          </CheckBox>
          <label htmlFor="startDate">Start Date</label>
          <TwoColumnWrapper id="startDate">
            <MonthSelect
              id="startDateMonth"
              value={data.startDateMonth}
              onChange={handleChange}
            />
            <YearSelect
              id="startDateYear"
              value={data.startDateYear.toString()}
              onChange={handleChange}
              min={currentYear - 100}
              max={currentYear}
            />
          </TwoColumnWrapper>
          <label htmlFor="endDate">End Date</label>
          <TwoColumnWrapper id="endDate">
            <MonthSelect
              id="endDateMonth"
              value={data.endDateMonth}
              onChange={handleChange}
              disabled={data.isActive}
            />
            <YearSelect
              id="endDateYear"
              value={data.endDateYear.toString()}
              onChange={handleChange}
              disabled={data.isActive}
              min={currentYear - 100}
              max={currentYear}
            />
          </TwoColumnWrapper>
          <label htmlFor="industry">Industry</label>
          <Input
            id="industry"
            value={data.industry}
            onChange={handleChange}
          />
          <label htmlFor="headline">Headline</label>
          <Input
            id="headline"
            value={data.headline}
            onChange={handleChange}
          />
          {errors && <Errors errors={errors} />}
          <ButtonPrimary type="submit">Save</ButtonPrimary>
        </Form>
      </Wrapper>
    </EntirePageModal>
  );
}

export default ExperienceModal;
