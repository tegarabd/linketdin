import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation register($input: RegisterUser!) {
    auth {
      register(input: $input) {
        activationId
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($input: LoginUser!) {
    auth {
      login(input: $input) {
        token
      }
    }
  }
`;
