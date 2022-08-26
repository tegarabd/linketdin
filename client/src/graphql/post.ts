import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation createPost($input: CreatePost!) {
    post {
      create(input: $input) {
        id
      }
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePost($input: LikePost) {
    post {
      like(input: $input) {
        id
        likes {
          id
        }
      }
    }
  }
`;

export const COMMENT_POST = gql`
  mutation commentPost($input: CommentPost) {
    post {
      comment(input: $input) {
        id
        comments(offset: 0, limit: -1) {
          id
          commenter {
            id
            firstName
            lastName
            additionalName
            profilePhotoUrl
          }
          text
          replies(offset: 0, limit: -1) {
            id
            commenter {
              id
              firstName
              lastName
              additionalName
              profilePhotoUrl
            }
            text
            post {
              id
            }
          }
        }
      }
    }
  }
`;