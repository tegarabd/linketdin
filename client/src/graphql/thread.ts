import { gql } from "@apollo/client";

export const THREAD = gql`
  query thread($threadId: String!) {
    thread(threadId: $threadId) {
      id
      user {
        id
      }
      with {
        id
      }
      messages {
        id
        sender {
          id
        }
        text
        imageUrl
        createdAt
      }
    }
  }
`;