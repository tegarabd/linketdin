import { useMutation } from "@apollo/client";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import styled from "styled-components";
import Errors from "../../../components/form/Errors";
import Form from "../../../components/form/Form";
import Input from "../../../components/form/Input";
import Textarea from "../../../components/form/Textarea";
import MonthSelect from "../../../components/select/MonthSelect";
import YearSelect from "../../../components/select/YearSelect";
import ButtonPrimary from "../../../components/utilities/button/ButtonPrimary";
import EntirePageModal from "../../../components/utilities/entirePage/EntirePageModal";
import { UPDATE_EDUCATION } from "../../../graphql/education";
import { USER_EDUCATIONS } from "../../../graphql/user";
import { useJwt } from "../../../hooks/useJwt";
import { useScroll } from "../../../hooks/useScroll";
import { Education } from "../../../types/education";

const Wrapper = styled.div`
  padding: 1rem;
`;

const TwoColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`;

function UpdataEducationModal({
  onClose,
  education,
}: {
  onClose: VoidFunction;
  education: Education;
}) {
  const [data, setData] = useState({
    educationId: education.id,
    school: education.school,
    degree: education.degree || "",
    field: education.field || "",
    startDateMonth: education.startDate?.month || "",
    startDateYear: education.startDate?.year || 0,
    endDateMonth: education.endDate?.month || "",
    endDateYear: education.endDate?.year || 0,
    grade: education.grade || 0,
    activities: education.activities || "",
    description: education.description || "",
  });

  const { makeWindowScrollable } = useScroll();
  const { sub } = useJwt();
  const [update] = useMutation(UPDATE_EDUCATION, {
    refetchQueries: [{ query: USER_EDUCATIONS, variables: { id: sub } }],
  });
  const [error, setError] = useState<string>(null!);

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > = (event) => {
    setData({
      ...data,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setError(null!);

    if (data.school === "") {
      setError("The school field must be filled");
      return;
    }

    await update({ variables: { input: data } });

    makeWindowScrollable();
    onClose();
  };

  const currentYear = new Date().getFullYear();

  return (
    <EntirePageModal
      title="Education"
      onClose={onClose}
      position="top"
    >
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="school">School</label>
          <Input
            id="school"
            value={data.school}
            onChange={handleChange}
          />
          <label htmlFor="degree">Degree</label>
          <Input
            id="degree"
            value={data.degree}
            onChange={handleChange}
          />
          <label htmlFor="field">Field</label>
          <Input
            id="field"
            value={data.field}
            onChange={handleChange}
          />
          <label htmlFor="startDate">Start Date</label>
          <TwoColumnWrapper id="startDate">
            <MonthSelect
              id="startDateMonth"
              onChange={handleChange}
              value={data.startDateMonth}
            />
            <YearSelect
              id="startDateYear"
              onChange={handleChange}
              value={data.startDateYear.toString()}
              min={currentYear - 100}
              max={currentYear + 10}
            />
          </TwoColumnWrapper>
          <label htmlFor="endDate">End Date</label>
          <TwoColumnWrapper id="endDate">
            <MonthSelect
              id="endDateMonth"
              onChange={handleChange}
              value={data.endDateMonth}
            />
            <YearSelect
              id="endDateYear"
              onChange={handleChange}
              value={data.endDateYear.toString()}
              min={currentYear - 100}
              max={currentYear + 10}
            />
          </TwoColumnWrapper>
          <label htmlFor="grade">Grade</label>
          <Input
            type="number"
            id="grade"
            value={data.grade}
            onChange={handleChange}
            step=".01"
            min={0}
          />
          <label htmlFor="activities">Activities</label>
          <Textarea
            id="activities"
            value={data.activities}
            onChange={handleChange}
          ></Textarea>
          <label htmlFor="description">Description</label>
          <Textarea
            id="description"
            value={data.description}
            onChange={handleChange}
          ></Textarea>
          {error && <Errors errors={[error]} />}
          <ButtonPrimary type="submit">Save</ButtonPrimary>
        </Form>
      </Wrapper>
    </EntirePageModal>
  );
}

export default UpdataEducationModal;
