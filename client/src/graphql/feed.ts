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
      tags {
        id
        text
      }
      createdAt
    }
  }
`;
