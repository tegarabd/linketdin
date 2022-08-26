import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Content from "../../../components/utilities/Content";
import { USER_EXPERIENCES } from "../../../graphql/user";
import { Experience as ExperienceType } from "../../../types/experience";

const Wrapper = styled(Content)`
  padding: 1.8rem;
`;

const List = styled.div`
  & > div {
    border-top: 1px solid ${(props) => props.theme.shadow};
  }
  &:nth-child(1) {
    border-top: none;
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
            <Item experience={experience} />
          ))}
      </List>
    </Wrapper>
  );
}

export default Experience;
