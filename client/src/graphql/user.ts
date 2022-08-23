import { gql } from "@apollo/client";

export const USER_PROFILE = gql`
  query userProfile($id: String!) {
    user(id: $id) {
      firstName
      lastName
      profilePhotoUrl
      headline
    }
  }
`;
