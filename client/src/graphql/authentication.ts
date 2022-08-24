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

export const ACTIVATE = gql`
  mutation activate($input: ActivateUser!) {
    auth {
      activate(input: $input) {
        id
      }
    }
  }
`;

export const VERIFY_FORGOT_PASSWORD_CODE = gql`
  mutation verifyForgotPasswordCode($input: ForgotPasswordCode!) {
    auth {
      verifyForgotPasswordCode(input: $input) {
        id
      }
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword($input: ResetPassword!) {
    auth {
      resetPassword(input: $input) {
        id
      }
    }
  }
`;
