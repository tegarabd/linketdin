import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Content from "../../../components/utilities/Content";
import { USER_EDUCATIONS } from "../../../graphql/user";
import { Education as EducationType } from "../../../types/education";

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

function Item({ education }: { education: EducationType }) {
  return (
    <div>
      <h3>{education.school}</h3>
    </div>
  );
}

function Education() {
  const { userId } = useParams();
  const { data } = useQuery(USER_EDUCATIONS, { variables: { id: userId } });

  return (
    <Wrapper>
      <h3>Education</h3>
      <List>
        {data &&
          data.user.educations.map((education: EducationType) => (
            <Item key={education.id} education={education} />
          ))}
      </List>
    </Wrapper>
  );
}

export default Education;
