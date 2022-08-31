import { useQuery } from "@apollo/client";
import React from "react";
import Content from "../../components/utilities/Content";
import { JOBS } from "../../graphql/job";
import { Job as JobType } from "../../types/job";
import Job from "./Job";

function Jobs() {
  const { data } = useQuery(JOBS);

  return (
    <Content padding="1rem">
      <h3>Recommended for you</h3>
      <p>Based on your profile and search history</p>
      {data &&
        data.jobs.map((job: JobType) => (
          <Job
            key={job.id}
            job={job}
          />
        ))}
    </Content>
  );
}

export default Jobs;
