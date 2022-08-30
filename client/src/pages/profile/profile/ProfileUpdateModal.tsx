import { useMutation } from "@apollo/client";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import styled from "styled-components";
import Errors from "../../../components/form/Errors";
import Form from "../../../components/form/Form";
import Input from "../../../components/form/Input";
import Select from "../../../components/form/Select";
import Textarea from "../../../components/form/Textarea";
import ButtonPrimary from "../../../components/utilities/button/ButtonPrimary";
import EntirePageModal from "../../../components/utilities/entirePage/EntirePageModal";
import { UPDATE_USER, USER_PROFILE } from "../../../graphql/user";
import { useScroll } from "../../../hooks/useScroll";
import { User } from "../../../types/user";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

function ProfileUpdateModal({
  user,
  onClose,
}: {
  user: User;
  onClose: VoidFunction;
}) {
  const [updateData, setUpdateData] = useState({
    ...user,
    locationCity: user.location.city || "",
    locationRegion: user.location.region || "",
  });
  const [update] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: USER_PROFILE, variables: { id: user.id } }],
  });
  const [error, setError] = useState<string>(null!);
  const {makeWindowScrollable} = useScroll()

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > = (event) => {
    setUpdateData({
      ...updateData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setError(null!);

    if (
      updateData.firstName === "" ||
      updateData.lastName === "" ||
      updateData.pronouns === "" ||
      updateData.locationCity === "" ||
      updateData.locationRegion === ""
    ) {
      setError("All required field must be filled");
      return;
    }

    await update({
      variables: {
        input: {
          userId: user.id,
          firstName: updateData.firstName,
          lastName: updateData.lastName,
          additionalName: updateData.additionalName || "",
          pronouns: updateData.pronouns,
          about: updateData.about || "",
          locationCity: updateData.locationCity,
          locationRegion: updateData.locationRegion,
        },
      },
    });
    
    makeWindowScrollable()
    onClose();
  };

  return (
    <EntirePageModal
      title="Update profile"
      position="top"
      onClose={onClose}
    >
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <h3>Personal information</h3>
          <p>* Indicates required</p>
          <label htmlFor="firstName">First name*</label>
          <Input
            id="firstName"
            value={updateData.firstName || ""}
            onChange={handleChange}
          />
          <label htmlFor="lastName">Last name*</label>
          <Input
            id="lastName"
            value={updateData.lastName || ""}
            onChange={handleChange}
          />
          <label htmlFor="additionalName">Additional name</label>
          <Input
            id="additionalName"
            value={updateData.additionalName || ""}
            onChange={handleChange}
          />
          <label htmlFor="pronouns">Pronouns*</label>
          <Select
            id="pronouns"
            value={updateData.pronouns || ""}
            onChange={handleChange}
          >
            <option value="">Please select</option>
            <option value="She/Her">She/Her</option>
            <option value="He/Him">He/Him</option>
            <option value="They/Them">They/Them</option>
            <option value="Custom">Custom</option>
          </Select>
          <label htmlFor="about">About</label>
          <Textarea
            id="about"
            value={updateData.about || ""}
            onChange={handleChange}
          ></Textarea>
          <h3>Location</h3>
          <label htmlFor="locationRegion">Country/Region*</label>
          <Input
            id="locationRegion"
            value={updateData.locationRegion || ""}
            onChange={handleChange}
          />
          <label htmlFor="locationCity">City/District*</label>
          <Input
            id="locationCity"
            value={updateData.locationCity || ""}
            onChange={handleChange}
          />
          {error && <Errors errors={[error]} />}
          <ButtonPrimary type="submit">Update</ButtonPrimary>
        </Form>
      </Wrapper>
    </EntirePageModal>
  );
}

export default ProfileUpdateModal;
