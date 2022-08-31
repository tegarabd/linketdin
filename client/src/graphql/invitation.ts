import { gql } from "@apollo/client";

export const ACCEPT_CONNECT_INVITATION = gql`
  mutation acceptConnectInvitation($input: AcceptInvitation!) {
    connection {
      accept(input: $input) {
        id
      }
    }
  }
`;

export const REJECT_CONNECT_INVITATION = gql`
  mutation rejectConnectInvitation($input: RejectInvitation!) {
    connection {
      reject(input: $input) {
        id
      }
    }
  }
`;