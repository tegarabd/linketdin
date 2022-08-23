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

export const VERIFY_EMAIL = gql`
  mutation verifyEmail($email: String!) {
    auth {
      verifyForgotPasswordEmail(input: { email: $email }) {
        forgotPasswordId
      }
    }
  }
`;
