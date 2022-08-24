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

export const GOOGLE = gql`
  mutation googleAuth($input: GoogleAuth!) {
    auth {
      google(input: $input) {
        token
      }
    }
  }
`;

export const IS_EMAIL_ALREADY_TAKEN = gql`
  mutation isEmailAlreadyTaken($email: String!) {
    auth {
      isEmailAlreadyTaken(email: $email)
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
