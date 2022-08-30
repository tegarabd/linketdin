import { gql } from "@apollo/client";

export const CREATE_EDUCATION = gql`
  mutation createEducation($input: CreateEducation!) {
    education {
      create(input: $input) {
        id
      }
    }
  }
`;

export const UPDATE_EDUCATION = gql`
  mutation updateEducation($input: UpdateEducation!) {
    education {
      update(input: $input) {
        id
      }
    }
  }
`;
