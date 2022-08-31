import { gql } from "@apollo/client";

export const JOBS = gql`
  query jobs {
    jobs {
      id
      title
      companyName
      workplace
      location {
        region
        city
      }
      employmentType
      description
    }
  }
`;

export const CREATE_JOB = gql`
  mutation createJob($input: CreateJob!) {
    job {
      create(input: $input) {
        id
      }
    }
  }
`;
