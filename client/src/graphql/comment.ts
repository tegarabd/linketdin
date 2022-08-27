import { gql } from "@apollo/client";

export const COMMENT = gql`
  query comment($commentId: String!) {
    comment(commentId: $commentId) {
      id
      commenter {
        firstName
        lastName
        additionalName
        profilePhotoUrl
      }
      text
      likes {
        id
      }
      replies(offset: 0, limit: -1) {
        id
      }
      createdAt
    }
  }
`;

export const COMMENT_REPLIES = gql`
  query commentReplies($commentId: String!, $limit: Int!, $offset: Int!) {
    commentReplies(commentId: $commentId, limit: $limit, offset: $offset) {
      id
      commenter {
        id
        firstName
        lastName
        additionalName
        profilePhotoUrl
      }
      text
      likes {
        id
      }
      replies(offset: 0, limit: -1) {
        id
      }
      createdAt
    }
  }
`;

export const LIKE_COMMENT = gql`
  mutation likeComment($input: LikeComment!) {
    comment {
      like(input: $input) {
        id
        likes {
          id
        }
      }
    }
  }
`;
