import React from "react";
import styled from "styled-components";
import { Job as JobType } from "../../types/job";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-bottom: 1px solid ${(props) => props.theme.shadow};
  padding: 1rem 0;

  & > h3 {
    color: ${(props) => props.theme.accent};
  }
`;

function Job({ job }: { job: JobType }) {
  return (
    <Wrapper>
      <h3>{job.title}</h3>
      <h4>{job.companyName}</h4>
      <p>
        {job.location.city}, {job.location.region} ({job.workplace})
      </p>
      <p>Desc: {job.description}</p>
    </Wrapper>
  );
}

export default Job;
