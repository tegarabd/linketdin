import { gql } from "@apollo/client";

export const UPDATE_EXPERIENCE = gql`
  mutation updateExperience($input: UpdateExperience!) {
    experience {
      update(input: $input) {
        id
      }
    }
  }
`;

export const CREATE_EXPERIENCE = gql`
  mutation createExperience($input: CreateExperience!) {
    experience {
      create(input: $input) {
        id
      }
    }
  }
`;