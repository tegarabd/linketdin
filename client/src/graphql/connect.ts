import { gql } from "@apollo/client";

export const CONNECT_USER = gql`
  mutation connectUser($fromId: String!, $toId: String!, $note: String!) {
    connection {
      create(input: { fromUserId: $fromId, toUserId: $toId, note: $note }) {
        id
      }
    }
  }
`;
