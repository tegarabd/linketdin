import { gql } from "@apollo/client";

export const LIKE_COMMENT = gql`
  mutation likeComment($input: LikeComment!) {
    comment {
      like(input: $input) {
        post {
          id
          comments(offset: 0, limit: -1) {
            id
            likes {
              id
            }
            replies(offset: 0, limit: -1) {
              likes {
                id
              }
            }
          }
        }
      }
    }
  }
`;
