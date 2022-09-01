import { gql } from "@apollo/client";

export const CREATE_MESSAGE = gql`
  mutation createMessage($input: CreateMessage!) {
    message {
      create(input: $input) {
        id
      }
    }
  }
`;