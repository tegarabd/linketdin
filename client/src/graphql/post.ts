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