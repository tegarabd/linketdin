import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ButtonTertiary from "../../../components/utilities/button/ButtonTertiary";
import Content from "../../../components/utilities/Content";
import { USER_EXPERIENCES } from "../../../graphql/user";
import { Experience as ExperienceType } from "../../../types/experience";
import { ReactComponent as EditIcon } from "../../../assets/edit-icon.svg";
import { ReactComponent as AddIcon } from "../../../assets/plus-icon.svg";
import { useProfile } from "../ProfileContextProvider";
import { useState } from "react";
import ExperienceModal from "./ExperienceModal";

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

function Item({ experience }: { experience: ExperienceType }) {
  const { canModify } = useProfile();
  const [experienceModalOpened, setExperienceModalOpened] = useState(false);

  const openExperienceModal = () => {
    setExperienceModalOpened(true);
  };

  const closeExperienceModal = () => {
    setExperienceModalOpened(false);
  };

  return (
    <ItemWrapper>
      <div>
        <h3>{experience.title}</h3>
        <p>
          {experience.companyName} • {experience.employmentType}
        </p>
        {experience.startDate.month && (
          <p>
            {experience.startDate.month} {experience.startDate.year} -
            {experience.endDate.month && !experience.isActive
              ? ` ${experience.endDate.month} ${experience.endDate.year}`
              : " now"}
          </p>
        )}
        <p>
          {experience.location.city &&
            `${experience.location.city}, ${experience.location.region}`}
        </p>
      </div>
      {canModify && (
        <ButtonTertiary onClick={openExperienceModal}>
          <EditIcon />
        </ButtonTertiary>
      )}
      {experienceModalOpened && (
        <ExperienceModal
          onClose={closeExperienceModal}
          experience={experience}
        />
      )}
    </ItemWrapper>
  );
}

function Experience() {
  const { canModify } = useProfile();
  const { userId } = useParams();
  const { data } = useQuery(USER_EXPERIENCES, {
    variables: { id: userId },
  });
  const [experienceModalOpened, setExperienceModalOpened] = useState(false);

  const openExperienceModal = () => {
    setExperienceModalOpened(true);
  };

  const closeExperienceModal = () => {
    setExperienceModalOpened(false);
  };

  return (
    <Wrapper>
      <ItemWrapper>
        <h3>Experience</h3>
        {canModify && (
          <ButtonTertiary onClick={openExperienceModal}>
            <AddIcon />
          </ButtonTertiary>
        )}
      </ItemWrapper>
      <List>
        {data &&
          (data.user.experiences.length > 0 ? (
            data.user.experiences.map((experience: ExperienceType) => (
              <Item
                key={experience.id}
                experience={experience}
              />
            ))
          ) : (
            <h4>No experience yet</h4>
          ))}
      </List>
      {experienceModalOpened && (
        <ExperienceModal onClose={closeExperienceModal} />
      )}
    </Wrapper>
  );
}

export default Experience;
