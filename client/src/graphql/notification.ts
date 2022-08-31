import { gql } from "@apollo/client";

export const CREATE_NOTIFICATION = gql`
  mutation createNotification($input: CreateNotification!) {
    notification {
      create(input: $input) {
        id
      }
    }
  }
`;