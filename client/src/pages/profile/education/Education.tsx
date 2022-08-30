import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Content from "../../../components/utilities/Content";
import { USER_EDUCATIONS } from "../../../graphql/user";
import { Education as EducationType } from "../../../types/education";
import { ReactComponent as EditIcon } from "../../../assets/edit-icon.svg";
import { ReactComponent as AddIcon } from "../../../assets/plus-icon.svg";
import ButtonTertiary from "../../../components/utilities/button/ButtonTertiary";
import CreateEducationModal from "./CreateEducationModal";
import { useProfile } from "../ProfileContextProvider";
import UpdataEducationModal from "./UpdataEducationModal";

const Wrapper = styled(Content)`
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const List = styled.div`
  & > div {
    padding: 0.5rem 0;
    border-top: 1px solid ${(props) => props.theme.shadow};
  }
`;

function Item({ education }: { education: EducationType }) {
  const { canModify } = useProfile();
  const [educationModalOpened, setEducationModalOpened] = useState(false);

  const openEducationModal = () => {
    setEducationModalOpened(true);
  };

  const closeEducationModal = () => {
    setEducationModalOpened(false);
  };

  return (
    <ItemWrapper>
      <div>
        <h3>{education.school}</h3>
        <p>
          {education.degree}
          {education.field && `, ${education.field}`}
        </p>
        {education.startDate.month && (
          <p>
            {education.startDate.month} {education.startDate.year}
            {education.endDate.month &&
              ` - ${education.endDate.month} ${education.endDate.year}`}
          </p>
        )}
        {education.grade > 0 && <p>Grade: {education.grade}</p>}
      </div>
      {canModify && (
        <ButtonTertiary onClick={openEducationModal}>
          <EditIcon />
        </ButtonTertiary>
      )}
      {educationModalOpened && (
        <UpdataEducationModal
          onClose={closeEducationModal}
          education={education}
        />
      )}
    </ItemWrapper>
  );
}

function Education() {
  const { canModify } = useProfile();
  const { userId } = useParams();
  const { data } = useQuery(USER_EDUCATIONS, { variables: { id: userId } });

  const [educationModalOpened, setEducationModalOpened] = useState(false);

  const openEducationModal = () => {
    setEducationModalOpened(true);
  };

  const closeEducationModal = () => {
    setEducationModalOpened(false);
  };

  return (
    <Wrapper>
      <ItemWrapper>
        <h3>Education</h3>
        {canModify && (
          <ButtonTertiary onClick={openEducationModal}>
            <AddIcon />
          </ButtonTertiary>
        )}
      </ItemWrapper>
      <List>
        {data &&
          (data.user.educations.length > 0 ? (
            data.user.educations.map((education: EducationType) => (
              <Item
                key={education.id}
                education={education}
              />
            ))
          ) : (
            <h4>No education yet</h4>
          ))}
      </List>
      {educationModalOpened && (
        <CreateEducationModal onClose={closeEducationModal} />
      )}
    </Wrapper>
  );
}

export default Education;
