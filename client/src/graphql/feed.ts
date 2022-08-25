import { gql } from "@apollo/client";

export const FEEDS = gql`
  query feeds($userId: String!, $limit: Int!, $offset: Int!) {
    postFeeds(userId: $userId, limit: $limit, offset: $offset) {
      id
      poster {
        id
        firstName
        lastName
        additionalName
        profilePhotoUrl
        headline
      }
      text
      photoUrl
      videoUrl
      comments(offset: 0, limit: -1) {
        id
      }
      sends {
        id
      }
      likes {
        id
      }
      tags {
        id
        text
      }
      createdAt
    }
  }
`;
