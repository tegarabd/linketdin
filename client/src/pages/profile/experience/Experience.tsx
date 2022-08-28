import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Content from "../../../components/utilities/Content";
import { USER_EXPERIENCES } from "../../../graphql/user";
import { Experience as ExperienceType } from "../../../types/experience";

const Wrapper = styled(Content)`
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const List = styled.div`
  & > div {
    padding-top: 0.5rem;
    border-top: 1px solid ${(props) => props.theme.shadow};
  }
`;

function Item({ experience }: { experience: ExperienceType }) {
  return (
    <div>
      <h3>{experience.title}</h3>
      <p>
        {experience.companyName} • {experience.employmentType}
      </p>
      <p>
        {experience.startDate.month} {experience.startDate.year} -
        {experience.endDate
          ? ` ${experience.endDate.month} ${experience.endDate.year}`
          : " now"}
      </p>
      <p>
        {experience.location &&
          `${experience.location.city}, ${experience.location.region}`}
      </p>
    </div>
  );
}

function Experience() {
  const { userId } = useParams();
  const { data } = useQuery(USER_EXPERIENCES, {
    variables: { id: userId },
  });

  return (
    <Wrapper>
      <h3>Experience</h3>
      <List>
        {data &&
          data.user.experiences.map((experience: ExperienceType) => (
            <Item key={experience.id} experience={experience} />
          ))}
      </List>
    </Wrapper>
  );
}

export default Experience;
