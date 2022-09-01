import { gql } from "@apollo/client";

export const POST = gql`
  query post($postId: String!) {
    post(postId: $postId) {
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
      comments(offset: 0, limit: -1, all: true) {
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

export const SEARCH_POST = gql`
  query searchPost($query: String!, $limit: Int!, $offset: Int!) {
    searchPost(query: $query, limit: $limit, offset: $offset) {
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
      comments(offset: 0, limit: -1, all: true) {
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

export const POST_COMMENTS = gql`
  query postComments($postId: String!, $limit: Int!, $offset: Int!) {
    postComments(postId: $postId, limit: $limit, offset: $offset) {
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
      }
    }
  }
`;

export const COMMENT_POST = gql`
  mutation commentPost($input: CommentPost) {
    post {
      comment(input: $input) {
        id
      }
    }
  }
`;
